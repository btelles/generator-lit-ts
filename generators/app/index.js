'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the ${chalk.red('generator-lit-ts')} generator!`
      )
    );

    const prompts = [];

    this.argument('elementName', {
      desc: 'Name of the element in dashed format e.g. my-element.',
      type: String,
      required: true
    });

    this.option('properties', {
      desc: 'Properties to be added to the element in propertyName:type format where type can be String, Number, Boolean, Array, and Object OR s,n,b,a,o',
      alias: 'p',
      type: String
    });

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
      this.options.elementClass = elementNameToClassName(this.options.elementName);
    });
  }

  writing() {
    const {elementName, elementClass} = this.options;
    const properties = getProperties(this.options.properties);
    this.fs.copyTpl(
      this.templatePath('element.ts'),
      this.destinationPath(`${this.options.elementName}.ts`),
      {elementName, elementClass, properties}
    );
  }

  install() {
    this.installDependencies();
  }
};

function elementNameToClassName(name) {
  const capitalized = name.replace(/^(\w)/, (m, n) => n.toUpperCase());
  return capitalized.replaceAll(/-(\w)/g, (m, current) => current.toUpperCase());
}

const TS_TYPES = {
  'o': '{}',
  'object': '{}',
  'Object': '{}',
  'String': 'string',
  'string': 'string',
  's': 'string',
  'n': 'number',
  'number': 'number',
  'Number': 'number',
};

const LIT_TYPES = {
  'o': 'Object',
  'object': 'Object',
  'Object': 'Object',
  'String': 'String',
  'string': 'String',
  's': 'String',
  'n': 'Number',
  'number': 'Number',
  'Number': 'Number',
};

function getProperties(properties) {
  if (!properties?.length) {
    return [];
  }

  const props = properties.split(' ');

  return props.map(pString => {
    const [name, typeCode] = pString.split(':');
    return {name, tsType: TS_TYPES[typeCode], litType: LIT_TYPES[typeCode]};
  });
}
