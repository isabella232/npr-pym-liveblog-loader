npr-pym-liveblog-loader
=======================

* [What is this?](#what-is-this)
* [Assumptions](#assumptions)
* [What's in here?](#whats-in-here)
* [Bootstrap the project](#bootstrap-the-project)
* [Hide project secrets](#hide-project-secrets)
* [Run the project](#run-the-project)
* [Build the project](#build-the-project)
* [Update the project](#update-the-project)
* [Deploy the project](#deploy-the-project)
* [Versioning](#versioning)
* [License and credits](#license-and-credits)
* [Additional contributors](#additional-contributors)


What is this?
-------------

NPR custom pym & customized child tracker loader that handles specific library needs inside npr.org while still being usable by our member stations.

Being able to use the same loader script inside NPR.org and inside our member station websites is a goal that we need to prepare to in advance so that we can profit for future developments in our CMS API as well as avoiding separation in our code.

Using an external script together with versioning will allow us moving forward to be able to patch assets embedded in a centralized fashion.

If you do not know what pym.js is and why it may be useful for you please check [pym.js documentation](http://blog.apps.npr.org/pym.js/). You'll see the standard loader in that documentation which follows the same practices as we used in our custom one.

But we needed some flexibility to account for NPR.org specific needs and did not want to pollute the standard pym-loader with NPR specific needs...that's why we have created a custom loader to account for our specific needs.

_Important: The version of pym that this loader points to is defined in package.json if a MAJOR release of pym is added then we should also change it here._

Assumptions
-----------

The following things are assumed to be true in this documentation.

* You are running OS X.
* You have installed Node.js.
* You have installed Grunt globally.

For more details on the technology stack used in NPR Visuals' app template, see our [development environment blog post](http://blog.apps.npr.org/2013/06/06/how-to-setup-a-developers-environment.html).

Modern versions of Windows and Linux should work equally well but are untested by the NPR Visuals Team.

What's in here?
---------------

The project contains the following folders and important files:

* ``dist`` -- Unminified and minified versions of pym.js library and the pym-loader.js loader.
* ``examples`` -- Collection of working use cases for npr-pym-loader.js
* ``src`` -- Source files for this project
* ``Gruntfile.js`` -- [Grunt.js](http://gruntjs.com/) task runner config file
* ``nprapps_tools`` -- NPR Deployment tools to the CDN

Bootstrap the project
---------------------

Node.js is required. If you don't already have it, get it like this:

```
brew install node
```

Then bootstrap the project:

```
npm install
```

Hide project secrets
--------------------

In this project the only project secrets that we have are the Sauce Labs credentials to secure a tunnel between Travis and Sauce Labs used in our continuous integration process. Those keys have been encrypted through Travis; you can read more about that process [here](https://docs.travis-ci.com/user/encryption-keys/)

Project secrets should **never** be stored anywhere else in the repository. They will be leaked to the client if you do. Instead, always store passwords, keys, etc. in environment variables and document that they are needed here in the README.

Run the project
---------------

In order to run pym.js the best approach is to fire up a local webserver and go to the examples to see it in action.

The included server includes `livereload` so each time you change something on the `examples` or `src` folder the server will refresh the page for you.

```
$ cd npr-pym-liveblog-loader
$ grunt server
```


## Development tasks

Grunt configuration is included for running common development tasks.

Javascript can be linted with [jshint](http://jshint.com/):

```
grunt jshint
```

Unminified source can be regenerated with:

```
grunt concat
```

Minified source can be regenerated with:

```
grunt uglify
```

API documention can be generated with [jsdoc](https://github.com/jsdoc3/jsdoc):

```
grunt jsdoc
```

Build the project
-----------------

We use grunt tasks to build the project into the `dist` folder. Linting JS, preprocessing, uglyfing, etc.

```
$ grunt
```

That execution will create a minified and unminified version of our custom folder on the `dist` folder.

It will also generate an API documentation if you want to check that out run:
```
$ grunt server
```

and navigate to http://localhost:9000/api/npr-pym-liveblog-loader/X.X.X/ on your browser.

Where X.X.X is the actual version of the loader defined in `package.json

Update the project
------------------

**NPR only** If a new version of the npr pym loader is needed the workflow would be:

* Make the needed changes on code and test it thoroughly in NPR.org and member stations test sites.
* Verify if versions of pym and carebot used need to be updated
* Change the version according following the [semantic versioning](http://semver.org/) pattern.

We use grunt tasks to build the project into the `dist` folder. Linting JS, preprocessing, uglyfing, etc.

```
$ grunt
```

That execution will create a minified and unminified version of our custom folder on the `dist` folder.

It will also generate an API documentation if you want to check that out run:
```
$ grunt server
```

and navigate to http://localhost:9000/api/npr-pym-liveblog-loader/X.X.X/ on your browser.

Where X.X.X is the actual version of the loader defined in `package.json

Deploy the project
------------------

After having build the new version of the library [see above](#update-the-project).

**NPR only** If a new version of the projects is needed the workflow would be:

```
cd nprapps_tools
mkvirtualenv npr-pym-liveblog-loader
pip install -r requirements.txt
fab deploy
```

This will deploy whatever is inside the `dist` folder to S3 and make it available through a CDN at `https://pym.nprapps.org/`

Versioning
----------

The project follows the [semantic versioning](http://semver.org/) pattern MAJOR.MINOR.PATCH.

* MAJOR version changes for backwards-incompatible API changes.
* MINOR version for new backwards-compatible functionality.
* PATCH version for backwards-compatible bug fixes.

To minimize the impact on our current and future customers, on the uncompressed and on the minified production side of npr-pym-loader we are only going to keep the major version exposed. That we can apply *PATCHES* and *MINOR* version changes without any change being made on our customer's code but we maintain the possibility of new major releases that are somewhat disruptive with previous versions of the library.

License and credits
-------------------

Released under the MIT open source license. See `LICENSE` for details.

npr-pym-liveblog-loader.js was built by the [NPR Visuals](http://github.com/nprapps) team
