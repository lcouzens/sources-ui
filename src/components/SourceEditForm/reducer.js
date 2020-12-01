import { parseSourceToSchema } from './parser/parseSourceToSchema';
import { prepareInitialValues } from './helpers';

export const initialState = {
  loading: true,
  source: undefined,
  initialValues: {},
  sourceType: undefined,
  schema: undefined,
  isSubmitting: false,
  initialLoad: true,
  submitError: false,
};

const reducer = (state, { type, source, sourceType, appTypes, intl, message, values, editing, messages }) => {
  switch (type) {
    case 'createForm':
      return {
        ...state,
        sourceType,
        initialValues: prepareInitialValues(state.source, sourceType.product_name),
        schema: parseSourceToSchema(state.source, sourceType, appTypes, intl),
        loading: false,
      };
    case 'setSource':
      return {
        ...state,
        source,
        initialLoad: false,
      };
    case 'submit':
      return {
        ...state,
        isSubmitting: true,
        submitError: false,
        values,
        editing,
      };
    case 'submitFinished':
      return {
        ...state,
        isSubmitting: false,
        source,
        message,
        messages,
      };
    case 'submitFailed':
      return {
        ...state,
        isSubmitting: false,
        submitError: true,
        message: undefined,
        messages: undefined,
      };
    case 'sourceChanged':
      return {
        ...state,
        initialLoad: true,
        loading: true,
      };
    default:
      return state;
  }
};

export default reducer;
