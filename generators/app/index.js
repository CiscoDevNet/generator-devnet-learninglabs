'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('DevNet Learning Labs') + ' generator!'
    ));

    var prompts = [
      {
        type: 'input',
        name: 'labId',
        message: 'Pick a lab ID (this must not contain spaces, but hyphens are OK)'
      },
      {
        type: 'input',
        name: 'title',
        message: 'What is the title for your lab?'
      },
      {
        type: 'input',
        name: 'slug',
        message: 'What is the description for your lab?'
      },
      {
        type: 'input',
        name: 'length',
        message: 'How long will your learning lab be (in minutes)?',
        default: '30'
      },
      {
        type: 'input',
        name: 'author_name',
        message: 'What is your name?'
      },
      {
        type: 'input',
        name: 'author_email',
        message: 'What is your email address?'
      }
    ];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    var context = {
      title: this.props.title,
      labId: this.props.labId,
      slug: this.props.slug,
      authorName: this.props.author_name,
      authorEmail: this.props.author_email,
      length: this.props.length
    };
    this.copy('sample-lab/byod.html', this.props.labId + '/byod.html', context);
    this.template('sample-lab/1.md', this.props.labId + '/1.md', context);
    this.template('sample-lab/2.md', this.props.labId + '/2.md', context);
    this.template('sample-lab/sample-lab.json', this.props.labId + '/' + this.props.labId + '.json', context);
  },
  
  end: function () {
    this.log('You now have a template Cisco DevNet Learning Lab.  If you add pages, you\'ll have to manually add them to the JSON file.');
  }

});
