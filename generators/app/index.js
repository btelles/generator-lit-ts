"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

/**
 * Main generator for lit-ts yeoman generator.
 */
module.exports = class extends Generator {
  async prompting() {
    this.log(
      yosay(`Welcome to the ${chalk.red("generator-lit-ts")} generator!`)
    );

    this.argument("elementName", {
      desc: "Name of the element in dashed format e.g. <%= elementName %>.",
      type: String,
      required: true,
    });

    this.option("properties", {
      desc: "Properties to be added to the element in propertyName:type format where type can be String, Number, Boolean, Array, and Object OR s,n,b,a,o",
      alias: "p",
      type: String,
    });

    this.option("directory", {
      desc: "Whether to generate a directory for the element.",
      alias: "d",
      type: Boolean,
      default: true,
    });

    this.option('workspace', {
      desc: "If the element is part of a larger project that uses YARN workspaces (i.e. lives inside a packages/ directory in a monorepo), use this flag to setup the correct module paths when running `yarn serve` or `wds --watch`",
      alias: "w",
      type: Boolean,
      default: false,
    });
    this.option('docs', {
      desc: 'Generate a static documentation site for the element (which you can then serve through github pages). Templates and pages are placed in /docs-src,  then generated through an npm script to /docs which is intended to be checked in so that GitHub pages can serve the site from /docs on the default (master/main) branch.',
      type: Boolean,
      default: false
    });

    this.props = new Properties(this.options);
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath("src/element.ts"),
      this.destinationPath(this.props.elementFile),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath("src/element-test.ts"),
      this.destinationPath(this.props.elementTestFile),
      this.props
    );


    [
      "tsconfig.json",
      "dev/index.html",
      "dev/README.md",
      "LICENSE",
      "package.json",
      "README.md",
      "rollup.config.js",
      "web-dev-server.config.js",
      "web-test-runner.config.js",
    ].forEach((f) => {
      this.fs.copyTpl(
        this.templatePath(f),
        this.destinationPath(this.props.joinDirectoryPath(f)),
        this.props
      );
    });
    
    if(this.props.docs) {
      [
        "docs-src/_data/api.11tydata.js",
        "docs-src/_includes/example.11ty.cjs",
        "docs-src/_includes/header.11ty.cjs",
        "docs-src/_includes/nav.11ty.cjs",
        "docs-src/_includes/page.11ty.cjs",
        "docs-src/_includes/relative-path.cjs",
        "docs-src/examples/index.md",
        "docs-src/_README.md",
        "docs-src/.eleventyignore",
        "docs-src/.nojekyll",
        "docs-src/api.11ty.cjs",
        "docs-src/docs.css",
        "docs-src/index.md",
        "docs-src/install.md",
        "docs-src/package.json",
    ].forEach((f) => {
      this.fs.copyTpl(
        this.templatePath(f),
        this.destinationPath(this.props.joinDirectoryPath(f)),
        this.props
      );
    });
    
    this.props.properties.forEach((property) => {
        this.fs.copyTpl(
          this.templatePath("docs-src/examples/name-property.md"),
          this.destinationPath(this.props.joinDirectoryPath(`docs-src/examples/${property.name}-property.md`)),
          {
            props: this.props,
            propertyName: property.name,
            propertyValue: PROPERTY_VALUES[property.litType],
          });
});
}
    
  }
};

class Properties {
  constructor(props) {
    const { elementName, properties, directory, docs } = props;
    this.elementName = elementName;
    this.docs = docs;
    this.inputProperties = properties;
    this.directory = directory;
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

    return props.map((pString) => {
      const [name, typeCode] = pString.split(":");
      return { name, tsType: TS_TYPES[typeCode], litType: LIT_TYPES[typeCode] };
    });
  }

  get directoryPath() {
    return this.directory ? this.elementName + "/" : "";
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
  n: "number",
  number: "number",
  Number: "number",
};

const LIT_TYPES = {
  o: "Object",
  object: "Object",
  Object: "Object",
  String: "String",
  string: "String",
  s: "String",
  n: "Number",
  number: "Number",
  Number: "Number",
};

const PROPERTY_VALUES = {
  "Object": "{someObject: 'with value'}",
  "String": "Some String",
  "Number": "3"
}