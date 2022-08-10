import {Form,FloatingLabel,Card,Button,CardGroup,Container,ListGroup,ListGroupItem, Col} from 'react-bootstrap' ;

import React from "react";

class StudentSingleExamView extends React.Component  {
            constructor(props) {
                super(props);
                this.state={
                   examName: "End Exam",
                   questionList:[
                   {id:0 ,Question:"What is ?",answer1:{answer:"urope", isAnswer:false},answer2:{answer:"asia",isAnswer:false},answer3:{answer:"swisterland",isAnswer:false},answer4:{answer:"canada",isAnswer:false}},
                   {id:1 ,Question:"How is ?",answer1:{answer:"urope", isAnswer:false},answer2:{answer:"asia",isAnswer:false},answer3:{answer:"swisterland",isAnswer:false},answer4:{answer:"canada",isAnswer:false}},
                   {id:2 ,Question:"Why is ?",answer1:{answer:"urope", isAnswer:false},answer2:{answer:"asia",isAnswer:false},answer3:{answer:"swisterland",isAnswer:false},answer4:{answer:"canada",isAnswer:false}},
                   {id:3 ,Question:"When is ?",answer1:{answer:"urope", isAnswer:false},answer2:{answer:"asia",isAnswer:false},answer3:{answer:"swisterland",isAnswer:false},answer4:{answer:"canada",isAnswer:false}}
                ],
                   

                   selectedIndex:0,
                }
            }

            changeAnswer = (type)=>{
                var quislist = this.state.questionList;

                    quislist[this.state.selectedIndex].answer1.isAnswer = false;
                    quislist[this.state.selectedIndex].answer2.isAnswer = false;
                    quislist[this.state.selectedIndex].answer3.isAnswer = false;
                    quislist[this.state.selectedIndex].answer4.isAnswer = false;

                 

                  quislist[this.state.selectedIndex][type].isAnswer = true;
                  this.setState({questionList:quislist});
                  console.log(quislist);
            }

                
            clickNext =()=>{
                var selindx = this.state.selectedIndex;
                if(selindx < this.state.questionList.length -1){
                    this.setState({selectedIndex:(selindx+1)});
                }
            }
            clickPrev=()=>{
                var selindx = this.state.selectedIndex;
                if((selindx ) > 0  ){
                    this.setState({selectedIndex:(selindx-1)});
                }

            }
            clickSave=(type)=>{
                
                }
               
            
            clickComplete=()=>{
                console.log("completed");
            }

            
            //add isanswer boolean to array object
            //add radio button to each answer
            //radio onChange -> this.changeanswer()
            //changeanswer -> get all array (var variable) -> loop and isanswer set to false -> array[state.selectedIndex].isanswer set to true
            //main array set -> setState({questionlist:array})
            //radio button checked={mainarray[selectedIndex].isanswer === true}
    

        render(){
          
            return(
                <div className="align-items-center justify-content-center student-single-exam" >
                <div style={{justifyContent:"center",margin:"0 auto",padding:"50px",border:"2px solid rgba(0, 0, 0.5, 0.05)",backgroundColor: "transparent"}}>
                
                
                   
                        <Card style={{margin:"auto",width:"100%",height:"calc(100vh - 100px)"}}>
                            
                            <Col xs={12} className='single-question'>
                                <p style={{width:"55px",padding:"30px",fontSize:"30px",fontWeight:"bold",fontFamily:"inherit",width:"500px"}}>{this.state.selectedIndex+1}.{this.state.questionList[this.state.selectedIndex].Question}</p>
                                
                                <ListGroup style={{width:"60%",height:"400px",fontSize:"20px",padding:"200px",fontWeight:"bold"}}>
                                    <ListGroupItem>
                                        <input type="radio" style={{ width: "25px"}} onChange={()=>this.changeAnswer("answer1")}  checked={this.state.questionList[this.state.selectedIndex].answer1.isAnswer ===true? true :false }/>
                                        {this.state.questionList[this.state.selectedIndex].answer1.answer}
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <input type="radio" style={{ width: "25px"}}  onChange={()=>this.changeAnswer("answer2")}  checked={this.state.questionList[this.state.selectedIndex].answer2.isAnswer ===true? true:false }/>
                                        {this.state.questionList[this.state.selectedIndex].answer2.answer}
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <input type="radio" style={{ width: "25px"}} onChange={()=>this.changeAnswer("answer3")}  checked={this.state.questionList[this.state.selectedIndex].answer3.isAnswer ===true? true:false }/>
                                        {this.state.questionList[this.state.selectedIndex].answer3.answer}
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <input type="radio" style={{ width: "25px"}}  onChange={()=>this.changeAnswer("answer4")}  checked={this.state.questionList[this.state.selectedIndex].answer4.isAnswer ===true? true:false } />
                                        {this.state.questionList[this.state.selectedIndex].answer4.answer}
                                    </ListGroupItem>
                                </ListGroup>


                            </Col>
                                 
                                 <span>
                                    <Button onClick={()=>this.clickPrev()} style={{fontWeight:"bold",fontSize:"20px",width:"100px",display:"inline",float:"left"}} size={"sm"} variant="secondary">Prev</Button>
                                    
                                    <Button  onClick={()=>this.clickNext()} style={{fontWeight:"bold",fontSize:"20px",width:"100px",  display:"inline",float:"right"}} size={"sm"} variant="secondary">Next</Button>
                                    
                                 </span>
                                 
                                 
                                     
                                 
                        </Card> 
                        
                
               
                    <div className="student-single-save-button">
                    <Button  onClick={()=>this.clickSave} style={{marginTop:"80px",fontWeight:"bolder",fontSize:"20px",width:"200px",display:"inline",float:"right"}} size={"sm"} variant="primary">Save</Button>
                    <Button  onClick={()=>this.clickComplete} style={{marginTop:"80px",fontWeight:"bolder",fontSize:"20px",width:"240px",display:"inline",float:"right"}} size={"sm"} variant="success">Complete</Button>     
                        

                    </div>
                           
                </div>
               
                </div>



            );



        }    




   
}

export default StudentSingleExamView;