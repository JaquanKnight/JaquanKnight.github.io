flowchart TD
    A([Start]) --> B{{Set Range for Random Number}}
    B --> C((Computer Selects a Random Number))
    C --> D[/Prompt User to Guess the Number/]
    D --> E{Is User's Guess Correct?}
    E -- Yes --> F>Display "Correct! You Win!"]
    E -- No --> G{Is Guess Too High?}
    G -- Yes --> H>Display "Too High! Try Again"]
    G -- No --> I>Display "Too Low! Try Again"]
    H --> D
    I --> D
    F --> J((End))

