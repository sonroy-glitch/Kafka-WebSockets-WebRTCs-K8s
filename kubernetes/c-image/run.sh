#!/bin/bash

# Create a temp file where user code will be stored
echo "$USER_CODE" > user_program.c

# Compile the C program


# Check if compilation was successful
if [ $? -eq 0 ]; then
    # If compilation succeeds, execute the program
    python 
else
    # If there are compilation errors, print them
    cat error.log
fi
l
l
l

