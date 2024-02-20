# Spinder: a dating simulator with inhabitants across space

A [Hack@Brown](https://hackatbrown.org/) 2024 project by four junior students at Brown University.

Check out our [Devpost](https://devpost.com/software/spinder-a-dating-simulator-with-habitants-across-space)!

## Inspiration

Large language models are great. We want to discover the potential of LLMs to act in characters, which can bring emotional values to users. We wanted to stick to the theme of outer space, and see how good chatgpt-4 is at generalizing and reasoning, to chat like beings beyond humans.

## What it does

It is a simulation of a dating app, where you can chat with 17 different aliens with different personalities. There will be a relation temperature bar that indicates your progress.

## How we built it

We used Next js as front end, and connected it to open ai api's. We used prompt engineer tricks to create aliens with different personalities, and kept track of the conversation history. We also integrated DALL-E api to generate images realtime according to conversation contexts. A relationship temperature bar was used to indicate your progress with the alien. Each time the alien sends you a message, a 'judge' chatgpt-4 will rate a number between -10 to 10 to modify the temperature bar.

## Challenges we ran into

It's hard to integrate Open AI api's with the ability to manage chat history.

## Accomplishments that we're proud of

We built a cool website. We successfully integrated ChatGPT api and successfully used Dall-E to generate images in real time.


## What's next for Spinder
Improve the prompts with more experiments; use database for better managements; give users the freedom to create characters.
