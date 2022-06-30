import "./styles.css";
import { useState, useEffect } from "react";
import { Table, Input, Form, Button, Modal, Row, Col } from "antd";
import "antd/dist/antd.css";
import { DeleteOutlined } from "@ant-design/icons";
import axios from 'axios';

/*
useEffect: initialize state(if state has not been used)

before render: get

*/ 

// devServer webpack --> create local server   
// eject 

export default function Box() {
  const [ideaListData, setIdeaListData] = useState([
    {
      key: "1",
      title: "Team building",
      proposer: "jingyi@intel.com",
      votes: 0
    },
    {
      key: "2",
      title: "Test environment",
      proposer: "feiyang@intel.com",
      votes: 0
    }
  ]);
  
  const [isVisible, setIsVisible] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const baseUrl2 = "http://localhost:5000/addIdea";
  const [newIdea, setNewIdea] = useState(null);
  // state cannot be calculate(variable is not allowed)?       have to use state first

  const columns = [
    {
      title: "Idea title",
      dataIndex: "title",
      key: "title"
    },
    {
      title: "Proposer",
      dataIndex: "proposer",
      key: "proposer"
    },
    {
      title: "Votes",
      dataIndex: "votes",
      key: "votes"
    },
    {
      title: "Action",
      dataIndex: "key",
      key: "action",
      render: (key) => (
        <div>
          <Button onClick={() => setIsDelete(true)} icon={<DeleteOutlined />}>
            Delete
          </Button>
          <Modal visible={isDelete} onOk={() => onDelete(key)} onCancel={() => setIsDelete(false)} title="Do you want delete it?">
          </Modal>
        </div>
      )
    }
  ];

  const onDelete = (key) => {
    let data = ideaListData;
    data.splice(
      data.findIndex((record) => record.key === key),
      1
    );
    setIdeaListData([...data]);
    setIsDelete(false);
  };

  const onClick = () => {
    setIsVisible(true);
  };

  const handleOk = () => {
    setIsVisible(false);
  };

  const handleCancel = () => {
    setIsVisible(false);
  };

 

  const onFinish = (values) => {
    let data = ideaListData;

    data.push({
      key: (data.length + 1).toString(),
      title: values.title,
      proposer: values.proposer,
      votes: 0
    });

    setIdeaListData(data.slice());
    setIsVisible(false);

    /*
    const myParam = {
      key: (data.length + 1).toString(),  // key value generate at db
      title: values.title,
      proposer: values.proposer,
      votes: 0
    };
    // [...data] data.slice()

    
    axios.post(baseUrl2, myParam).then((response) => {                                  // connect to backend
      console.log(response.data);
      setNewIdea(response.data)
    }).catch((error) => {
      console.log(error)
    });
    */

  };
  
  return (
    <div className="App">
      <Row>
        <Col span={4} offset={20}>
          <Button onClick={onClick}>Add an idea</Button>
        </Col>
      </Row>
      <br />
      <Table dataSource={ideaListData} columns={columns} pagination={false} />
      <Modal
        visible={isVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        title="Add an idea"
      >
        <Form labelCol={{ span: 4 }} wrapper={{ span: 20 }} onFinish={onFinish}>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input title of idea" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Proposer"
            name="proposer"
            rules={[{ required: true, message: "Please input your email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 20, span: 4 }}>
            <Button type="primary" htmlType="sinmit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      

    </div>

  );
}