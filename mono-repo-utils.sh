#!/bin/bash

# Main script to run various utilities

# Function to create a new package
create_package() {
    ./mono-repo-utils/create-package.sh
}

# Add more functions for other utilities as needed

# Main menu
echo "Select an option:"
echo "1. Create a new package"
# Add more options as needed

read -p "Enter your choice [1]: " choice
choice=${choice:-1}

case $choice in
    1)
        create_package
        ;;
    # Add more cases for other options
    *)
        echo "Invalid option"
        ;;
esac