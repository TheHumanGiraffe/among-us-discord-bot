# Usage
Make sure you have a working version of docker and git  
Edit the config file with your bot key and channel Id's  

```
docker run -d\
    --name stfubot \
    -e TOKEN=YOURTOKENHERE \
    -e HUSH=YOURQUIETCHANNELIDHERE \
    -e TALK=YOURTALKINGCHANNELIDHERE \
    thehumangiraffe/among-us-discord-bot:latest
```

