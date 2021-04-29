
import { CustomInput, Collapse, Button, CardBody, Card, Modal, ModalHeader, ModalBody, ModalFooter,  Form, FormGroup, Label, InputGroup, InputGroupText, InputGroupAddon, Input } from 'reactstrap';
import { useState } from 'react';
import axios from 'axios';
import { BsChevronDown, BsChevronUp, BsClockFill } from "react-icons/bs";
import { FaRegCheckCircle, FaCheckCircle } from "react-icons/fa";

const Ticket = (props) => {

    const {item, className} = props;
    
    const [modal, setModal] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isDone, setDone] = useState(false);
    const [isPriority, setPriority] = useState(1);

    const [authorSt, setAuthor] = useState('');
    const [completeSt, setComplete] = useState("");
    const [completeStShow, setCompleteShow] = useState("");
    const [descriptionSt, setDescription] = useState('');
    const [timeSt, setTime] = useState('');
    const [titleSt, setTitle] = useState('');
    const [topicSt, setTopic] = useState('');
    const [urgencySt, setUrgency] = useState('');
    var checkAuth;
    var checkTitle;
    var checkDesc;
    var urgencyCheck;
    var topicCheck;
    var btn;
    var tickBtn;
    var priorityBtn;


    const isEnabled = item.complete;


    const expand = () => setIsOpen(!isOpen);

    function deleteT(id) {
      axios.delete("http://localhost:8901/delete/"+id)
      .then(response => {
        console.log(response.data);
      });
    }

    function mark(id) {
      axios.put("http://localhost:8904/update/"+id, {
        completed: true
      })
      .then(response => {
        console.log(response.data);
      });
    }

    function handleSubmit(id) {
  
      let ticket = {
        author: authorSt,
        complete: completeSt,
        description: descriptionSt,
        time_created: timeSt,
        title: titleSt,
        topic: topicSt,
        urgency: urgencySt
      };
  
      axios.post("http://localhost:8904/update"+id,  ticket)
        .then(res => {
          console.log(res);
          console.log(res.data);
        })
    }

    const toggle = () => setModal(!modal);


      if (isOpen) {
        btn = <BsChevronUp className="contractQueueIc" onClick={expand}/>;
      } else {
        btn = <BsChevronDown className="expandQueueIc" onClick={expand}/>;
      }
  
      if (isDone) {
        tickBtn = <FaCheckCircle className="completedIc"/>;
      } else {
        tickBtn = <FaRegCheckCircle className="uncompletedIc"/>;
      }
  
      if(isPriority === 1){
        priorityBtn = <BsClockFill className="mostUrgIcQ"/>
      } else if(isPriority === 2){
        priorityBtn = <BsClockFill className="secMostUrgIcQ"/>
      }else if(isPriority === 3){
        priorityBtn = <BsClockFill className="middleUrgIcQ"/>
      }else if(isPriority === 4){
        priorityBtn = <BsClockFill className="secLeastUrgIcQ"/>
      }else if(isPriority === 5){
        priorityBtn = <BsClockFill className="leastUrgIcQ"/>
      }


    return (
        <div className="ticket_div" key={item.id}>
            
              <p className="ticket_comp title_comp">{item.title} </p>
              <p className="ticket_comp">{item.topic} </p>
              {btn}
              {tickBtn}
              {priorityBtn}
              
              <Collapse isOpen={isOpen}>
                <Card id="cueCard">
                  <CardBody>
                    <p><strong>Author:</strong> {item.author}</p>
                    <br />
                    <p><strong>Topic:</strong> {item.topic}</p>
                    <br />
                    <p><strong>Description:</strong></p>
                    <p>{item.description}</p>
                    <br />
                    <p><strong>Urgency:</strong> {item.urgency}</p>
                    <br />
                    <p><strong>Date created:</strong> Anim pariatur cliche</p>
                    <Button disabled={isEnabled} color="success" className="queueBtnBlock" onClick={() => mark(item.id)}>Mark as done</Button>
                    <Button color="warning" className="queueBtnBlock" onClick={toggle}>Update ticket</Button>
                    <Button color="danger" className="queueBtnBlock" onClick={() => deleteT(item.id)}>Delete ticket</Button>
                    <div>
                      <Modal isOpen={modal} toggle={toggle} className={className}>
                        <ModalHeader toggle={toggle}>Update ticket</ModalHeader>
                        <ModalBody>
                          <Form>
                          <InputGroup>
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>Author</InputGroupText>
                              </InputGroupAddon>
                              <Input type="text" name="author" id="author" value={item.author} onChange={(e) => setAuthor(e.target.value)} placeholder="Enter author name"/>
                            </InputGroup>
                            <br />
                            <InputGroup>
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>Title</InputGroupText>
                              </InputGroupAddon>
                              <Input type="text" name="title" id="title" value={item.title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter title"/>
                            </InputGroup>
                            <br />
                            <InputGroup>
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>Description</InputGroupText>
                              </InputGroupAddon>
                              <Input type="textarea" name="description" id="description" value={item.description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter description" />
                            </InputGroup>
                            <br />
                            <FormGroup>
                              <Label for="radioLabel">Topic</Label>
                              <div>
                                <CustomInput type="radio" id="topic1" name="topic" onChange={(e) => setTopic(e.target.value)} value="Topic1" label="Topic 1" />
                                <CustomInput type="radio" id="topic2" name="topic" onChange={(e) => setTopic(e.target.value)} value="Topic2" label="Topic 2" />
                                <CustomInput type="radio" id="topic3" name="topic" onChange={(e) => setTopic(e.target.value)} value="Topic3" label="Topic 3" />
                                <CustomInput type="radio" id="topic4" name="topic" onChange={(e) => setTopic(e.target.value)} value="Topic4" label="Topic 4" />
                                <CustomInput type="radio" id="topic5" name="topic" onChange={(e) => setTopic(e.target.value)} value="Topic5" label="Topic 5" />
                              </div>
                              {topicCheck}
                            </FormGroup>
                            <FormGroup>
                              <Label for="radioLabel">Urgency</Label>
                              <div>
                                <CustomInput type="radio" id="exampleCustomRadio" onChange={(e) => setUrgency(e.target.value)} name="urgency" value="1" label="Most urgent" />
                                <CustomInput type="radio" id="exampleCustomRadio2" onChange={(e) => setUrgency(e.target.value)} name="urgency" value="2" label="Very urgent" />
                                <CustomInput type="radio" id="exampleCustomRadio3" onChange={(e) => setUrgency(e.target.value)} name="urgency" value="3" label="Slightly urgent" />
                                <CustomInput type="radio" id="exampleCustomRadio4" onChange={(e) => setUrgency(e.target.value)} name="urgency" value="4" label="Less urgent" />
                                <CustomInput type="radio" id="exampleCustomRadio5" onChange={(e) => setUrgency(e.target.value)} name="urgency" value="5" label="Least urgent" />
                                {urgencyCheck}
                              </div>
                            </FormGroup>
                            <br />

                            <Input type="hidden" name="completed" id="completed" value="false"/>
                          </Form>
                          </ModalBody>
                        <ModalFooter>
                          <Button color="primary" onClick={toggle}>Update ticket</Button>{handleSubmit(item.id)}
                          <Button color="secondary" onClick={toggle}>Cancel</Button>
                        </ModalFooter>
                      </Modal>
                    </div>

                  </CardBody>
                </Card>
              </Collapse>
          </div>
    )

}
export default Ticket;