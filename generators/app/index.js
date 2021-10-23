"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

/**
 * Main generator for lit-ts yeoman generator.
 */
module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.log(
      yosay(`Welcome to the ${chalk.red("generator-lit-ts")} generator!`)
    );

    this.argument("elementName", {
      desc: "Name of the element in dashed format e.g. my-cool-element.",
      type: String,
      required: true
    });

    this.option("properties", {
      desc: `Properties to be added to the element in 
                          propertyName:type format where type can be
                          String, Number, Boolean, Array, and Object OR s,n,b,a,o`,
      alias: "p",
      type: String
    });

    this.option("directory", {
      desc: `Create a directory for the element and
                          generated files (recommended).`,
      alias: "d",
      type: Boolean,
      default: true
    });

    this.option("workspace", {
      desc: `Use this flag to setup correct module paths if the element 
                          is part of a larger project that uses YARN or Lerna
                          workspaces (i.e. if the element will live inside a
                          packages/ directory in a monorepo). This is important
                          for web-dev-server-config and if you use webpack in the
                          parent project.`,
      alias: "w",
      type: Boolean,
      default: false
    });
    this.option("docs", {
      desc: `Generate a static documentation site for the 
                          element (which you can then serve through github
                          pages). Templates and pages are placed in /docs-src,
                          then generated through an npm script to /docs which
                          is intended to be checked in so that GitHub pages
                          can serve the site from /docs on the default
                          (master/main) branch.`,
      type: Boolean,
      default: false
    });

    this.props = new Properties(this.options);
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath("src/element.ts.ejs"),
      this.destinationPath(this.props.elementFile),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath("src/element-test.ts.ejs"),
      this.destinationPath(this.props.elementTestFile),
      this.props
    );

    [
      "tsconfig.json.ejs",
      "dev/index.html.ejs",
      "dev/README.md.ejs",
      "LICENSE.ejs",
      "package.json.ejs",
      "README.md.ejs",
      "rollup.config.js.ejs",
      "web-dev-server.config.js.ejs",
      "web-test-runner.config.js.ejs"
    ].forEach(f => {
      this.fs.copyTpl(
        this.templatePath(f),
        this.destinationPath(
          this.props.joinDirectoryPath(f.replace(".ejs", ""))
        ),
        this.props
      );
    });

    if (this.props.docs) {
      [
        "docs-src/_data/api.11tydata.js.ejs",
        "docs-src/_includes/example.11ty.cjs.ejs",
        "docs-src/_includes/header.11ty.cjs.ejs",
        "docs-src/_includes/nav.11ty.cjs.ejs",
        "docs-src/_includes/page.11ty.cjs.ejs",
        "docs-src/_includes/relative-path.cjs.ejs",
        "docs-src/examples/index.md.ejs",
        "docs-src/_README.md.ejs",
        "docs-src/.eleventyignore.ejs",
        "docs-src/.nojekyll.ejs",
        "docs-src/api.11ty.cjs.ejs",
        "docs-src/docs.css.ejs",
        "docs-src/index.md.ejs",
        "docs-src/install.md.ejs",
        "docs-src/package.json.ejs",
        ".eleventy.cjs.ejs"
      ].forEach(f => {
        this.fs.copyTpl(
          this.templatePath(f),
          this.destinationPath(
            this.props.joinDirectoryPath(f.replace(".ejs", ""))
          ),
          this.props
        );
      });

      this.props.properties.forEach(property => {
        this.fs.copyTpl(
          this.templatePath("docs-src/examples/name-property.md.ejs"),
          this.destinationPath(
            this.props.joinDirectoryPath(
              `docs-src/examples/${property.name}-property.md`
            )
          ),
          {
            props: this.props,
            propertyName: property.name,
            propertyValue: property.value
          }
        );
      });
    }
  }
};

class Properties {
  constructor(props) {
    const { elementName, properties, directory, docs, workspace } = props;
    this.elementName = elementName;
    this.docs = docs;
    this.inputProperties = properties;
    this.directory = directory;
    this.workspace = workspace;
  }

  get elementFile() {
    return this.joinDirectoryPath("src/" + this.elementName + ".ts");
  }

  get elementClass() {
    const capitalized = this.elementName.replace(/^(\w)/, (m, n) =>
      n.toUpperCase()
    );
    return capitalized.replaceAll(/-(\w)/g, (m, current) =>
      current.toUpperCase()
    );
  }

  get elementTestFile() {
    return this.joinDirectoryPath("src/" + this.elementName + "-test.ts");
  }

  get properties() {
    if (!this.inputProperties?.length) {
      return [];
    }

    const props = this.inputProperties.split(" ");

    return props.map(pString => {
      const [name, typeCode] = pString.split(":");
      return {
        name,
        tsType: TS_TYPES[typeCode],
        litType: LIT_TYPES[typeCode],
        value: PROPERTY_VALUES[LIT_TYPES[typeCode]]
      };
    });
  }

  get directoryPath() {
    return this.directory ? this.elementName + "/" : "";
  }

  get propertiesAsAttributes() {
    return this.properties.map(p => `${p.name}="${p.value}"`).join(" ");
  }

  joinDirectoryPath(fileName) {
    return this.directoryPath + fileName;
  }
}

const TS_TYPES = {
  o: "{}",
  object: "{}",
  Object: "{}",
  String: "string",
  string: "string",
  s: "string",
  a: "Array",
  array: "Array",
  Array: "Array",
  n: "number",
  number: "number",
  Number: "number"
};

const LIT_TYPES = {
  o: "Object",
  object: "Object",
  Object: "Object",
  String: "String",
  string: "String",
  s: "String",
  a: "Array",
  array: "Array",
  Array: "Array",
  n: "Number",
  number: "Number",
  Number: "Number"
};

const PROPERTY_VALUES = {
  Object: "{someObject: 'with value'}",
  Array: "[]",
  String: "Some String",
  Number: "3"
};
