import React from 'react';
import Input from 'src/components/input';
import Button from 'src/components/button';
import { Select } from 'src/components/select';
import { UsersSearchQuery } from 'src/services/usersManage.services';
import { Authority, UserStaus } from 'src/types/types';
import Fieldset from 'src/components/field-set';

interface Props {
  searchQuery: UsersSearchQuery;
  onSearchQueryChange: (name: string, e: any) => void;
  onSearch: VoidFunction;
}

// ----------------------------------------------------------------------
const AuthOption = [
  { value: '', label: '전체선택' },
  { value: Authority.ADMIN, label: '관리자' },
  { value: Authority.USER, label: '사용자' },
];

const StatusOption = [
  { value: '', label: '전체선택' },
  { value: UserStaus.APPROVED, label: '승인' },
  { value: UserStaus.PENDING, label: '대기' },
  { value: UserStaus.REJECTED, label: '거절' },
];
// ----------------------------------------------------------------------

const UserTableTollbar = ({
  searchQuery,
  onSearchQueryChange,
  onSearch,
}: Props) => {
  return (
    <div className='userTableTollbar'>
      <div className='inputGroup'>
        <Fieldset label='권한'>
          <Select
            name={'권한'}
            selected={searchQuery.filter.authority}
            setSelected={(e: any) => onSearchQueryChange('authority', e)}
            data={AuthOption}
          />
        </Fieldset>
        <Fieldset label='상태'>
          <Select
            name={'상태'}
            selected={searchQuery.filter.status}
            setSelected={(e: any) => onSearchQueryChange('status', e)}
            data={StatusOption}
          />
        </Fieldset>
        <Fieldset
          label='이름 및 이메일'
          style={{
            flex: 1,
          }}
        >
          <Input
            value={searchQuery.filter.nameOrEmail}
            onChange={(e: any) =>
              onSearchQueryChange('nameOrEmail', e.target.value)
            }
            placeholder='이름 또는 이메일을 입력해주세요.'
          />
        </Fieldset>
      </div>
      <Button fill style={{ wordBreak: 'keep-all' }} onClick={onSearch}>
        조회
      </Button>
    </div>
  );
};

export default UserTableTollbar;
