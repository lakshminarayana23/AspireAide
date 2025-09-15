import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Button, Card, Typography } from 'antd';

const { Title, Text } = Typography;

const AdminProfile = () => {
  return (
    <Card style={styles.container}>
      <div style={styles.profileHeader}>
        <div style={styles.profileIcon}>
          <UserOutlined style={styles.icon} />
        </div>
        <div style={styles.profileDetails}>
          <Title level={2} style={styles.name}>Admin</Title>
          <Text style={styles.email}>Email: admin@gmail.com .com</Text>
        </div>
      </div>

      
      
    </Card>
  );
};

const styles = {
  container: {
    width: '100%',
    maxWidth: '700px',
    margin: '30px auto',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
  },
  profileHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '30px',
  },
  profileIcon: {
    backgroundColor: '#f0f4f7',
    padding: '20px',
    borderRadius: '50%',
    marginRight: '20px',
  },
  icon: {
    fontSize: '50px',
    color: '#4e73df',
  },
  profileDetails: {
    flex: 1,
  },
  name: {
    fontWeight: '600',
  },
  email: {
    color: '#555',
  },
  actions: {
    marginTop: '20px',
  },
  actionsTitle: {
    color: '#4e73df',
    fontWeight: '600',
  },
  actionList: {
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    margin: '8px 0',
    fontSize: '16px',
  },
};

export default AdminProfile;
