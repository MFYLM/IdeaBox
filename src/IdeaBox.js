import "./styles.css";
import { useState, useEffect } from "react";        // useState and useEffect can be used in function component
import { Table, Input, Form, Button, Modal, Row, Col } from "antd";
import "antd/dist/antd.css";
import { DeleteOutlined } from "@ant-design/icons";

export default function TheIdexBox() {
    const [ideaListData, setIdeaListData] = useState([
        {
            key: "1",
            title: "Plan 1",
            proposer: "jingyi@gmail.com",
            vote: 0,
            content: "This is a test plan"
        },
        {
            key: "2",
            title: "Plan 2",
            proposer: "feiyangm@178.com",
            vote: 0,
            content: "Plan Content"
        }
    ]);
    
    const [isVisible, setIsVisible] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [visibleContent, SetVisibleContent] = useState(false);

    const columns = [
        {
            title: "Idea Title",
            dataIndex: "title",
            key: "title"
        },
        {
            title: "Proposer",
            dataIndex: "proposer",
            key: "proposer"
        },
        {
            title: "Vote",
            dataIdex: "vote",
            key: "vote"
        },
        {
            title: "Action",
            dataIndex: "key",
            key: "action",
            render: (key) => (
                <div>
                    <Button onClick={(event) => {setIsDelete(true); event.stopPropagation();}} icon={<DeleteOutlined />} >
                        delete
                    </Button>
                    <Modal visible={isDelete} onOk={(event) => {onDelete(key); event.stopPropagation();}} onCancel={(event) => {setIsDelete(false); event.stopPropagation();}} title="Do you want delete it?">
                    </Modal>
                </div>
            )
        }
    ];
    
    /*
    const [isDelete, setIsDelet] = useState(false);

    const confirmDelete = (key) => {
        if (isDelete) {
            onDelete(key);
        } else {
            
        }
    }
    */

    const [ideaList, setIdeaList] = useState(columns);      // making columns stateful, so we could alter it later

    const onDelete = (key) => {
        let data = ideaListData;
        data.splice(
            data.findIndex((info) => info.key === key), 1
        );

        setIdeaListData([...data]);
        setIsDelete(false);
    }


    const onClick = () => {
        setIsVisible(true);
    }

    // onFinish contains onSubmit                   values would be the data from form
    const onFinish = (values) => {
        let data = ideaListData;
        data.push({
            key: (data.length + 1).toString(),
            title: values.title,
            proposer: values.proposer,
            vote: 0,
            content: values.content
        });

        setIdeaListData(data.slice());
        setIsVisible(false);

    }
    
    const handleOk = () => {
        setIsVisible(false);
    }

    const handleCancel = () => {
        setIsVisible(false);
    }

    const { TextArea } = Input;
    const [TargetContent, setContent] = useState("");

    /*
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
    */

    return (
        <div className="TheIdeaBox">
            <Row>
                <Col span={4} offset={20}>
                    <Button onClick={onClick}>Add an idea</Button>
                </Col>
            </Row>
            <br />
            <Table dataSource={ideaListData} columns={columns} pagination={false} onRow={(record, rowIndex) => 
                {
                    return {
                        onClick: event => {
                            // console.log(record.content);            // rendering the element before onload all information
                            setContent(record.content);
                            SetVisibleContent(true);
                        }
                    }
                }} />

            <Modal visible={visibleContent} onOk={() => SetVisibleContent(false)} onCancel={() => SetVisibleContent(false)} title="Content of Idea" footer={null}>
                <p>Content: {TargetContent}</p>
            </Modal>

            <Modal visible={isVisible} onOk={handleOk} onCancel={handleCancel} footer={null} title="New Idea">
                <Form labelCol={{ span: 4 }} wrapper={{ span: 20 }} onFinish={onFinish}>
                    <Form.Item label="Title" name="title" rules={[{required: true, message: "Please enter title of idea"}]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Proposer" name="proposer" rules={[{required: true, message: "Please enter proposer of idea"}]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Content" name="content" rules={[{required: true, message: "Please provide description of your plan"}]}>
                        <TextArea rows={4} />
                    </Form.Item>
                    <Form.Item wrapperCol={{offset: 20, span: 4}}>
                        <Button type="primary" htmlType="sinmit">
                            submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}


