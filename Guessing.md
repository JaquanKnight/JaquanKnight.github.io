# Random Number Guessing Game Flowchart

This  outlines the flowchart for a random guessing game where the computer selects a random number within a range, and the user guesses until they find the correct number. The game provides feedback on each guess.

flowchart TD
    A([Start]):::start --> B{{Set Range for Random Number}}:::process
    B --> C((Computer Selects a Random Number)):::decision
    C --> D[/Prompt User to Guess the Number/]:::process
    D --> E{Is User's Guess Correct?}:::decision
    E -- Yes --> F>Display "Correct! You Win!"]:::output
    E -- No --> G{Is Guess Too High?}:::decision
    G -- Yes --> H>Display "Too High! Try Again"]:::output
    G -- No --> I>Display "Too Low! Try Again"]:::output
    H --> D
    I --> D
    F --> J((End)):::end

    classDef start fill:#FFDDC1,stroke:#333,stroke-width:2px;
    classDef process fill:#C1EFFF,stroke:#333,stroke-width:2px;
    classDef decision fill:#FFEFC1,stroke:#333,stroke-width:2px,stroke-dasharray: 5;
    classDef output fill:#C1FFC1,stroke:#333,stroke-width:2px,stroke-dasharray: 2;
    classDef end fill:#FFC1C1,stroke:#333,stroke-width:2px;
