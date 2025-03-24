#!/bin/bash

# Script Vars
FRONT_URL="https://github.com/Matchesca/cloud-drive.git"
BACK_URL="https://github.com/Matchesca/cloud-drive-server.git"
APP_DIR=~/drive
FRONT_DIR="$APP_DIR/frontend"
BACK_DIR="$APP_DIR/backend"

# Update linux
echo "Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Check if Docker is already installed
if command -v docker &> /dev/null; then
    echo "Docker is already installed. Skipping Docker installation."
    docker --version
else
    echo "Installing Docker..."
    sudo curl -fsSL https://get.docker.com | sh
    echo "Docker installation completed."
fi

# Check if Docker Compose is already installed
if command docker compose version &> /dev/null; then
    echo "Docker Compose is already installed. Skipping Docker Compose Installation."
    docker compose version
else
    echo "Installing Docker Compose..."
    sudo apt-get install docker-compose-plugin

    # Make sure it is installed
    if command docker compose version &> /dev/null; then
        echo "Docker Compose installed successfully."
        docker compose version
    else
        echo "Docker Compose installation failed. Aborting..."
        exit 1
    fi
fi

# Create app directory if it does not exist
if [ ! -d "$APP_DIR" ]; then
    echo "Creating application directory at $APP_DIR"
    mkdir -p "$APP_DIR"
fi

# Clone or Update Git repos
echo "Setting up frontend repo..."
if [ -d "$FRONT_DIR" ]; then
    echo "Frontend repo exists pulling new changes..."
    cd "$FRONT_DIR"
    git pull
    if [ $? -eq 0 ]; then
        echo "Frontend repo updated successfully."
    else
        echo "Error in updating frontend repo. Aborting..."
        exit 1
    fi
else
    echo "Cloning frontend repo..."
    git clone "$FRONT_URL" "$FRONT_DIR"
    if [ $? -eq 0 ]; then
        echo "Frontend repo cloned successfully."
    else
        echo "Error in cloning frontend repo. Aborting..."
        exit 1
    fi
fi

echo "Setting up backend repo..."
if [ -d "$BACK_DIR" ]; then
    echo "Backend repo exists pulling new changes..."
    cd "$BACK_DIR"
    git pull
    if [ $? -eq 0 ]; then
        echo "Backend repo updated successfully."
    else
        echo "Error in updating backend repo. Aborting..."
        exit 1
    fi
else
    echo "Cloning backend repo..."
    git clone "$BACK_URL" "$BACK_DIR"
    if [ $? -eq 0 ]; then
        echo "Backend repo cloned successfully."
    else
        echo "Error in cloning backend repo. Aborting..."
        exit 1
    fi
fi

