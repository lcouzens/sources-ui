import React from 'react';
import PropTypes from 'prop-types';
import { SimpleTableFilter } from '@redhat-cloud-services/frontend-components';
import { useIntl } from 'react-intl';

const SourcesFilter = ({ onFilterSelect, onFilter, columns }) =>{
    const intl = useIntl();

    return (
        <SimpleTableFilter
            buttonTitle={null}
            placeholder={
                intl.formatMessage({
                    id: 'sources.filterBySourceName',
                    defaultMessage: 'Filter by source name'
                })
            }
            xoptions={{
                title: intl.formatMessage({
                    id: 'sources.filterBy',
                    defaultMessage: 'Filter by'
                }),
                items: columns
            }}
            onOptionSelect={onFilterSelect}
            onButtonClick={onFilter}
            onFilterChange={onFilter}
        />
    );
};

SourcesFilter.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string,
        title: PropTypes.string
    })).isRequired,
    onFilter: PropTypes.func.isRequired,
    onFilterSelect: PropTypes.func.isRequired
};

export default SourcesFilter;
