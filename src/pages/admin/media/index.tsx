import React from 'react';
import './style.scss';
import Card from 'src/components/card';
import ButtonsGroup from 'src/components/buttons-group';
import Button from 'src/components/button';

const AdminMedia = () => {
  return (
    <div className="adminMediaContainer">
      <Card>미디어 목록</Card>
      <ButtonsGroup>
        <Button fill>추가</Button>
      </ButtonsGroup>
      <Card>
        <div className="gridContainer">
          <Card className="item">Instagram</Card>
          <Card className="item">Facebook</Card>
          <Card className="item">Youtube</Card>
          <Card className="item">Enjoy</Card>
        </div>
      </Card>
    </div>
  );
};

export default AdminMedia;
