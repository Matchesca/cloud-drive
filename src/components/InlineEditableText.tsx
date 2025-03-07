"use client";
import { MUTATIONS } from "@/actions/MUTATIONS";
import { computeNewUrl } from "@/lib/utils";
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
    inputRef.current?.focus();
  }, []);

  // Keyboard event handler
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleRename(text);
      // Prevent the onBlur event from firing a duplicate call.
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

  return (
    <input
      value={text}
      ref={inputRef}
      className="border-b border-dotted bg-transparent outline-none"
      onChange={(e) => setText(e.target.value)}
      onKeyDown={handleKeyDown}
      onBlur={() => {
        if (!submittedRef.current) {
          handleRename(text);
        }
      }}
    />
  );
};

export default InlineEditableText;
