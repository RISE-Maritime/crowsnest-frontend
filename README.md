# Crowsnest

Crowsnest, a testing and demonstration application base developed by RISE Maritime. This platform is designed to serve as a launchpad for swift prototyping, offering an opportunity to experience future Human-Machine Interfaces (HMI) for use in marine operations, remote operation centers and more.

It is a [React](https://react.dev/) web-application aimed to use [Open Bridge](https://www.openbridge.no/) design guidelines as fare as reasonable e posable.  

## Quick start on own computer 

```bash

npm install 

npm start

# OR

docker compose -f docker-compose.yml up 
```


## Connectors

- Keelson (Zenoh)
- MQTT
- Devise sensors (GNSS & IMU)

## Quick getting stated with a local copy on your computer

1. Clone the repository `git clone git@github.com:MO-RISE/crowsnest-frontend.git` 
2. Go in to the folder `cd crowsnest-frontend`
3. The application needs first to install dependencies to run, you need [Node.js](https://nodejs.org/en/download/current) and [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) installed on your computer. To install dependencies run: `npm install`
4. Start the frontend development server:
   `npm start` it will open webpage to `localhost:3000` or go enter the URL manual into your browser.

## Navigation charts setup

1. Start the crowsnest-gis and crowsnest-tiles services: `docker-compose -f docker-compose.dev.yml up -d`

## Production

The Crow's Nest frontend is meant to be served by a docker container. The latest Docker container image can be pulled from [MORISE's public docker registry](https://github.com/orgs/MO-RISE/packages).

To build the image yourself:

1. Clone the `crowsnest-frontend` repository.

   - with HTTPS:
     `git clone https://github.com/MO-RISE/crowsnest-frontend.git`
   - with SSH:
     `git clone git@github.com:MO-RISE/crowsnest-frontend.git`

2. Cd into the main directory (i.e. where the `Dockerfile` file is) and run the following command:

```bash
docker build . -t crowsnest-frontend .
```

Afterwards, the production container can be run with a command similar to this one:

```bash
docker run --rm -p 8888:80 crowsnest-frontend
```

The application will then be available at the URL `http://localhost:9999`. Note that the production container exposes its webserver on port 80, so the `-p` flag must be used to bind this port to the host. Furthermore, the `-e` flag can be used to pass the environmental variable `MQTT_BROKER_URL`. This variable points to the URL where the web application can reach an MQTT broker. If `MQTT_BROKER_URL` is not given, the default value of `XXXX` is used.

## Protobuffer

Install comandline tool on locally:

```bash
npm install -g protobufjs
npm install -g protobufjs-cli
```

Bundel all `.proto`

```bash
pbjs -t json file1.proto file2.proto > bundle.json


pbjs -t json .\awesome.proto .\CompressedVideo.proto .\envelope.proto .\primitives.proto .\CompressedImage.proto .\RawImage.proto > bundle.json
```

## Transforming SVG to components (Tips and Trix)

Example of export options in figma
![Image of export setting](./src/resources/doc_pics/figma-svg-export.png)

1. Transform svg file to react component, this can be done with [svg2jsx](https://svg2jsx.com). Make sure component ID are incudes in the export as svg2jsx has default setting to remove ID.
2. Manual edit svg:
   1. Each props should be defined in function declaration
   2. Text elements should have --> `fontFamily="Roboto"  textAnchor="middle"`
   3.

## Issues

Plotting maps does not work in _Firefox_ because it is not compatible with `OffscreenCanvas`.



## Example .env development setup

If running development following setup allows for quick configurations to each station

```
REACT_APP_MQTT_USERNAME=""
REACT_APP_MQTT_PASSWORD=""
REACT_APP_MQTT_BROKER_ADDRESS="wss://crowsnest.mo.ri.se:443/mqtt"
REACT_APP_WEBRTC_USERNAME=""
REACT_APP_WEBRTC_PASSWORD=""
REACT_APP_MQTT_LOCAL_BROKER_ADDRESS="localhost"
REACT_APP_MQTT_LOCAL_USERNAME=""
REACT_APP_MQTT_LOCAL_PASSWORD=""
REACT_APP_ZENOH_LOCAL_ROUTER_URL_="http://localhost:8000"
```
