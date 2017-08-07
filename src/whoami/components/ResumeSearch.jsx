import React from 'react';
import { connect } from 'react-redux';

import Alert from 'elemental/lib/components/Alert';
import FormIconField from 'elemental/lib/components/FormIconField';
import FormInput from 'elemental/lib/components/FormInput';
import Table from 'elemental/lib/components/Table';

import 'elemental/less/elemental.less';

import search from '../actions/search';

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

    handleInput = (e) => {
      this.setState({ text: e.target.value });
    };

    handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        this.props.onSearch(this.state.text);
      }
    }

    render() {
      return (
        <FormIconField width="one-half" iconPosition="left" iconKey="search">
          <FormInput
            type="text"
            placeholder="Search Résumé"
            value={this.state.text}
            onInput={this.handleInput}
            onKeyPress={this.handleKeyPress}
          />
        </FormIconField>
      );
    }
}

const ResumeRow = ({ id, name, title, company, description }) => (
  <tr>
    <td>{id}</td>
    <td>{name}</td>
    <td>{title}</td>
    <td>{company}</td>
    <td>{description}</td>
  </tr>
);

const ResumeTable = ({ resumes }) => (
  <Table>
    <colgroup>
      <col width="15%" />
      <col width="15%" />
      <col width="15%" />
      <col width="15%" />
      <col width="40%" />
    </colgroup>
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Current Job Title</th>
        <th>Current Job Company</th>
        <th>Current Job Description</th>
      </tr>
    </thead>
    <tbody>
      {
        resumes && resumes.map(({ id, name, title, company, description }) => (
          <ResumeRow
            key={id}
            id={id}
            name={name}
            title={title}
            company={company}
            description={description}
          />
        ))
      }
    </tbody>
  </Table>
);

const SearchAlert = ({ err }) => {
  if (err) {
    return (
      <Alert type="danger">
        <strong>Error: </strong>{err}
      </Alert>
    );
  }
  return null;
};

const ResumeSearchView = ({ found, err, onSearch }) => (
  <div>
    <SearchAlert err={err} />
    <SearchBox onSearch={onSearch} />
    <ResumeTable resumes={found} />
  </div>
);

const mapStateToProps = state => state.search;

const mapDispatchToProps = dispatch => ({
  onSearch: q => dispatch(search(q)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResumeSearchView);
