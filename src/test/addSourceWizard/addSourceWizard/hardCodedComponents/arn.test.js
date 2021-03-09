import React from 'react';

import { Text } from '@patternfly/react-core/dist/esm/components/Text/Text';
import { TextContent } from '@patternfly/react-core/dist/esm/components/Text/TextContent';
import { TextList } from '@patternfly/react-core/dist/esm/components/Text/TextList';
import { TextListItem } from '@patternfly/react-core/dist/esm/components/Text/TextListItem';
import { ClipboardCopy } from '@patternfly/react-core/dist/esm/components/ClipboardCopy/ClipboardCopy';
import { Button } from '@patternfly/react-core/dist/esm/components/Button/Button';
import { Popover } from '@patternfly/react-core/dist/esm/components/Popover/Popover';

import QuestionCircleIcon from '@patternfly/react-icons/dist/esm/icons/question-circle-icon';

import RendererContext from '@data-driven-forms/react-form-renderer/dist/esm/renderer-context';

import * as AwsArn from '../../../../components/addSourceWizard/hardcodedComponents/aws/arn';
import mount from '../../__mocks__/mount';

describe('AWS-ARN hardcoded schemas', () => {
  it('ARN DESCRIPTION is rendered correctly', () => {
    const wrapper = mount(<AwsArn.ArnDescription />);

    expect(wrapper.find(TextContent)).toHaveLength(1);
    expect(wrapper.find(Text)).toHaveLength(1);
    expect(wrapper.find(TextList)).toHaveLength(1);
    expect(wrapper.find(TextListItem)).toHaveLength(2);
  });

  it('IAM POLICY is rendered correctly', () => {
    const S3_BUCKET_NAME = 'BBBUCKETTT';
    const FORM_OPTIONS = {
      getState: () => ({
        values: {
          application: {
            extra: {
              bucket: S3_BUCKET_NAME,
            },
          },
        },
      }),
    };

    const wrapper = mount(
      <RendererContext.Provider value={{ formOptions: FORM_OPTIONS }}>
        <AwsArn.IAMPolicyDescription />
      </RendererContext.Provider>
    );

    expect(wrapper.find(TextContent)).toHaveLength(1);
    expect(wrapper.find(Text)).toHaveLength(3);
    expect(wrapper.find(TextList)).toHaveLength(1);
    expect(wrapper.find(TextListItem)).toHaveLength(3);
    expect(wrapper.find(ClipboardCopy)).toHaveLength(1);
    expect(wrapper.find(ClipboardCopy).html().includes(S3_BUCKET_NAME)).toEqual(true);
  });

  it('IAM POLICY returns error message when there is no S3_bucket value', () => {
    const S3_BUCKET_NAME = undefined;
    const FORM_OPTIONS = {
      getState: () => ({
        values: {
          application: {
            extra: {
              bucket: S3_BUCKET_NAME,
            },
          },
        },
      }),
    };

    const wrapper = mount(
      <RendererContext.Provider value={{ formOptions: FORM_OPTIONS }}>
        <AwsArn.IAMPolicyDescription />
      </RendererContext.Provider>
    );

    expect(wrapper.find(Text)).toHaveLength(1);
    expect(wrapper.find(Text).text().includes('wrong')).toEqual(true);
  });

  it('IAM ROLE is rendered correctly', () => {
    const CM_ID = '589173575009';
    const wrapper = mount(<AwsArn.IAMRoleDescription />);

    expect(wrapper.find(TextContent)).toHaveLength(1);
    expect(wrapper.find(Text)).toHaveLength(1);
    expect(wrapper.find(TextList)).toHaveLength(1);
    expect(wrapper.find(TextListItem)).toHaveLength(4);
    expect(wrapper.find(ClipboardCopy)).toHaveLength(1);
    expect(wrapper.find(ClipboardCopy).html().includes(CM_ID)).toEqual(true);
  });

  it('TAGS DESCRIPTION is rendered correctly', () => {
    const wrapper = mount(<AwsArn.TagsDescription />);

    expect(wrapper.find(TextContent)).toHaveLength(1);
    expect(wrapper.find(Text)).toHaveLength(4);
    expect(wrapper.find(TextList)).toHaveLength(1);
    expect(wrapper.find(TextListItem)).toHaveLength(2);
  });

  it('USAGE description is rendered correctly', () => {
    const wrapper = mount(<AwsArn.UsageDescription />);

    expect(wrapper.find(TextContent)).toHaveLength(1);
    expect(wrapper.find(Text)).toHaveLength(2);
    expect(wrapper.find(TextList)).toHaveLength(2);
    expect(wrapper.find(TextListItem)).toHaveLength(9);
  });

  it('IncludeAliasesLabel description is rendered correctly', () => {
    const wrapper = mount(<AwsArn.IncludeAliasesLabel />);
    wrapper.find('span').simulate('click');

    expect(wrapper.find(Popover)).toHaveLength(1);
    expect(wrapper.find(Button)).toHaveLength(1);
    expect(wrapper.find(QuestionCircleIcon)).toHaveLength(1);
  });

  it('IncludeOrgUnitsLabel description is rendered correctly', () => {
    const wrapper = mount(<AwsArn.IncludeOrgUnitsLabel />);
    wrapper.find('span').simulate('click');

    expect(wrapper.find(Popover)).toHaveLength(1);
    expect(wrapper.find(Button)).toHaveLength(1);
    expect(wrapper.find(QuestionCircleIcon)).toHaveLength(1);
  });
});
