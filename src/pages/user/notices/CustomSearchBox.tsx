import React, { useState, useRef } from 'react';
import {
  useInstantSearch,
  useSearchBox,
  UseSearchBoxProps,
} from 'react-instantsearch';
import Input from 'src/components/input';
import { MdClose } from 'react-icons/md';
import { px } from 'src/utils/styles';

export function CustomSearchBox(props: UseSearchBoxProps) {
  const { query, refine } = useSearchBox(props);
  const { status } = useInstantSearch();
  const [inputValue, setInputValue] = useState(query);
  const inputRef = useRef<HTMLInputElement>(null);

  const isSearchStalled = status === 'stalled';

  function setQuery(newQuery: string) {
    setInputValue(newQuery);

    refine(newQuery);
  }

  return (
    <div className='userNoticeSearchBox'>
      <form
        action=''
        role='search'
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();

          if (inputRef.current) {
            inputRef.current.blur();
          }
        }}
        onReset={(event) => {
          event.preventDefault();
          event.stopPropagation();

          setQuery('');

          if (inputRef.current) {
            inputRef.current.focus();
          }
        }}
      >
        <Input
          ref={inputRef}
          autoComplete='off'
          autoCorrect='off'
          autoCapitalize='off'
          placeholder='공지사항 종류 또는 제목을 입력하세요.'
          spellCheck={false}
          maxLength={512}
          type='text'
          value={inputValue}
          onChange={(event) => {
            setQuery(event.currentTarget.value);
          }}
          autoFocus
        />
        {inputValue && (
          <button
            type='reset'
            hidden={inputValue.length === 0 || isSearchStalled}
          >
            <MdClose size={px(16)} />
          </button>
        )}
      </form>
    </div>
  );
}
