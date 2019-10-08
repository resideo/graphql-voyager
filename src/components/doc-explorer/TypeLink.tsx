import * as React from 'react';
import * as classNames from 'classnames';
import { isBuiltInScalarType, isScalarType, isInputObjectType } from '../../introspection';
import { highlightTerm } from '../../utils';

interface TypeLinkProps {
  type: {
    name: string;
  };
  onClick: (any) => void;
  filter?: string;
}

export default class TypeLink extends React.Component<TypeLinkProps> {
  render() {
    const { type, onClick, filter } = this.props;

    let className;
    if (isBuiltInScalarType(type)) className = '-built-in';
    else if (isScalarType(type)) className = '-scalar';
    else if (isInputObjectType(type)) className = '-input-obj';
    else className = '-object';

    return (
      <a
        className={classNames('type-name', className)}
        onClick={event => {
          event.stopPropagation();
          onClick(type);
        }}
      >
        {highlightTerm(type.name, filter)}
      </a>
    );
  }
}
