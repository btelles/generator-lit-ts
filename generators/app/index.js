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
  }
};

class Properties {
  constructor(props) {
    const { elementName, properties, directory } = props;
    this.elementName = elementName;
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
