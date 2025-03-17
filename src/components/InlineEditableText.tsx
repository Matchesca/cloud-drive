"use client";
import { MUTATIONS } from "@/actions/MUTATIONS";
import { computeNewUrl } from "@/lib/utils";
import { webdavClient } from "@/lib/webdav-client";
import { StorageItem } from "@/modules/dashboard/Dashboard";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

interface InlineEditableTextProps {
  item: StorageItem;
  onCancel: () => void;
  setEditingItem: Dispatch<SetStateAction<StorageItem | null>>;
}

const InlineEditableText: React.FC<InlineEditableTextProps> = ({
  item,
  onCancel,
  setEditingItem,
}) => {
  const [text, setText] = useState(decodeURIComponent(item.name));
  const inputRef = useRef<HTMLInputElement>(null);
  const submittedRef = useRef(false); // flag to prevent duplicate submissions
  const queryClient = useQueryClient();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }, 100); // delay 100ms; adjust if needed
    return () => clearTimeout(timer);
  }, []);

  // Keyboard event handler
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && item.id !== -1) {
      handleRename(text);
      // Prevent the onBlur event from firing a duplicate call.
      e.preventDefault();
    } else if (e.key === "Enter" && item.id === -1) {
      handleCreateFolder(text);
      e.preventDefault();
    } else if (e.key === "Escape") {
      onCancel();
    }
  };

  const mutation = useMutation({
    mutationFn: MUTATIONS.rename,
    // Invalidate the drive data to refetch
    onSuccess: () => {
      console.log("Succesfully renamed");
      setEditingItem(null);
      queryClient.invalidateQueries({ queryKey: ["driveData"] });
    },
    onError: () => {
      onCancel();
      submittedRef.current = false;
    },
  });

  const newFolderMutation = useMutation({
    mutationFn: async (url: string) => {
      try {
        await webdavClient.createDirectory(url);
        return "Success";
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      console.log("Succesfully created a new folder");
      setEditingItem(null);
      queryClient.invalidateQueries({ queryKey: ["driveData"] });
    },
    onError: () => {
      onCancel();
      submittedRef.current = false;
    },
  });

  const handleRename = (newText: string) => {
    if (submittedRef.current) return; // Prevent duplicate submissions

    if (newText === item.name) {
      inputRef.current?.blur();
      onCancel();
      return;
    }

    submittedRef.current = true;
    const newItem: StorageItem = {
      ...item,
      name: encodeURIComponent(newText),
      url: computeNewUrl(item.url, newText),
    };

    mutation.mutate({ item, newItem });
    // Blur the input to remove focus immediately.
    inputRef.current?.blur();
  };

  const handleCreateFolder = (name: string) => {
    if (submittedRef.current) return; // Prevent duplicate submissions

    if (name === "") {
      inputRef.current?.blur();
      return;
    }
    const url = item.url + name;
    newFolderMutation.mutate(url);

    submittedRef.current = true;
  };

  return (
    <input
      value={text}
      ref={inputRef}
      className="border-b border-dotted bg-transparent outline-none"
      onChange={(e) => setText(e.target.value)}
      onKeyDown={handleKeyDown}
      onBlur={() => {
        if (!submittedRef.current && item.id !== -1) {
          handleRename(text);
        } else if (item.id === -1) {
          handleCreateFolder(text);
        }
      }}
    />
  );
};

export default InlineEditableText;
