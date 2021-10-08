<img src="./flameCoach.png?raw=true"
data-canonical-src="./logo.png?raw=true"/>
# flame-coach-web
Web code for Flame Coach Application

## Description
This is the frontend source of Flame Coach. Code is using the [flame-coach-service] to retrieve the information 
to expose into the website. If you want to develop a new feature you must write the core code in the [flame-coach-service].

Flame Coach frontend is using reactj and nextjs as the core framework, which means the code it's in Javascript (ES6).

## Compile 🏗️
It's easy to compile and use the Flame Coach Web. 
Keep in mind you will need to run a backend instance in your local computer (find how [here](https://github.com/FlameNutrition/flame-coach-service/blob/master/README.md#run-%EF%B8%8F)). 
The project uses package.json to manage dependencies, also, there you can find scripts will help you to compile, build and run the application.

To compile the application please run the following command:
```
yarn install
```

## Run ▶️
To run the web application, please use the following command:
```
yarn run dev
```

## Release & Deploy 🚀
Please use the following project [flame-coach-tools] to create a new release.
If you need access to the project, please open an issue to request access.
```
Release:
e.g: ./flame-coach-tools --release --releaseVersion <version> --snapshotVersion <version-snapshot> --web/api

Deploy:
e.g: ./flame-coach-tools --api/web --deploy --version <version>
```

## Contributing ✍️
Pull requests are welcome. Please check the [CONTRIBUTING.md](https://github.com/FlameNutrition/flame-coach-web/blob/master/CONTRIBUTING.md) to find the best way to contribute.

## Authors and acknowledgment
I'm waiting for you 🤟

## License
This opensource project it's under the following license: [MIT]

[flame-coach-tools]: https://github.com/FlameNutrition/flame-coach-tools
[flame-coach-service]: https://github.com/FlameNutrition/flame-coach-service
[mit]: https://choosealicense.com/licenses/mit/
