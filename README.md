# Telegram Bot

This is a telegram bot written in Express.js and ready to deploy to Google App Engine.

## Setup instruction

### Setup Telegram API

Telegram has two different way to receive bot commands:

1. Polling Telegram `getUpdate` API
2. Setup a bot webhook to receive any message sent to bot

Since we cannot set webhook to our local development server. In order for us to debug bot code, we need to poll telegram API. 

The poll code are currently located in `app.js`. Uncomment it to debug. Those code will move to a module in the next update.

### Setup webhook

A telegram bot webhook can be easily set by a URL.

    https://api.telegram.org/bot[bot token]/setWebHook?url=[webhook url]

## Environment variables

All sensitive credentials are stored in `.env` file and will not commit to git repository. Please create with this template

    TELEGRAM_TOKEN=Telegram bot API token. Can get it from botfather

## app.yaml

Google App Engine environment settings are stored in `app.yaml`. **DO NOT** check in to git.

    # [START app_yaml]
    runtime: nodejs
    vm: true
    env_variables:
      TELEGRAM_TOKEN: Telegram bot API token. Can get it from botfather
    # [END app_yaml]


## Deployment

If you want to host this bot in your own Google App Engine, [Check here](https://cloud.google.com/nodejs/resources/frameworks/express#expressjs_config)

> Remember to put `TELEGRAM_TOKEN` in `app.yaml`

## Contributing

**Everyone** is encouraged to help improve this project.

## Submitting a Pull Request

1. Fork the project.
2. Create a topic branch.
3. Implement your feature or bug fix.
4. Commit and push your changes.
5. Submit a pull request.