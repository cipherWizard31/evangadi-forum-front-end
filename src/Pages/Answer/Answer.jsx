import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "../../API/axiosConfig";
import { AuthContext } from "../../App";
import QueAnsBox from "../../Components/QueAnsBox/QueAnsBox";
import classes from "./answer.module.css";
import LayOut from "../../Components/Layout/LayOut";
import Error from "../../Components/Error/Error";

function Answer() {
  // stores the answer in a state
  const [answer, setAnswer] = useState("");
  // stores the list of answers retrived in a state
  const [ans, setAns] = useState(null);
  // stores errors in a state
  const [answerError, setAnswerError] = useState("");
  // store the new submitted answer in a test
  const [newAnswer, setNewAnswer] = useState(false);
  // extacted from the authentication context and provides details about the user logged in
  const { user } = useContext(AuthContext);
  // extracted from the URL and represents the the question id 
  const { id } = useParams();

  // retrives the selected question from the local storage
  const storedQuestion = JSON.parse(localStorage.getItem("selectedQuestion"));
  // if the question isn't found it sets it to null
  const question = storedQuestion || null;

  console.log(question);

  useEffect(() => {
    const getAnswer = async () => {
      try {
        //retrives token for authentication from localstorage
        const token = localStorage.getItem("token"); // Safely access localStorage

        // sending request to fetch the answers and it is set to the ans state 
        const { data: answerData } = await axios.get(`/answer/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(answerData.answers);

        setAns(answerData.answers);
      } catch (error) {
        // alert("internal server error12");
      }
    };
    getAnswer();
  }, [newAnswer, id]);

  // handles submission of new answer
  const handleSubmit = async (event) => {
    event.preventDefault();
    let isValid = true;
    setAnswerError("");
    // checking if the answer input is not empty 
    if (!answer) {
      setAnswerError("Answer is required.");
      isValid = false;
    } else if (answer.length < 5) {
      setAnswerError("answer must be at least 5 characters long!");
      isValid = false;
    }
    if (!isValid) return;
    const answerData = {
      userid: user.userid,
      questionid: id,
      answer: answer,
    };

    //posting the answer to the database
    try {
      const token = localStorage.getItem("token");
      await axios.post("/answer/postAnswers", answerData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("posted successfully");
      setAnswer("");
      setNewAnswer(!newAnswer);
    } catch (error) {
      alert("internal server error");
      setAnswer("");
    }
  };

  return (
    <LayOut>
      <section className={classes.outerContainer}>
        <div>
          <div>
            <h2>Question</h2>

            <div>
              <div className={classes.icon_container}>
                <i className={`fas fa-arrow-circle-right ${classes.icon}`}></i>

                <span className={classes.titleSpan}>{question.title}</span>
              </div>

              <div className={classes.line}></div>
            </div>
            <p>{question.content}</p>
            <h2 className={classes.answerBorder}>Answer From The Community </h2>
            {ans ? (
              <div>
                {ans?.map((ans, i) => (
                  <QueAnsBox
                    content={true}
                    key={i}
                    transition={false}
                    data={ans}
                  />
                ))}
              </div>
            ) : (
              <div style={{ textAlign: "center", margin: "50px 0" }}>
                Be the first to answer the question!
              </div>
            )}
          </div>
        </div>
        <h2 className={classes.topAnswer}>Answer The Top Question</h2>
        <div className={classes.goToQuestion}>
          <Link to="/home">Go to question page</Link>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <textarea
              id="content"
              name="content"
              value={answer}
              className={classes.textarea}
              rows="15"
              cols="109"
              placeholder="your answer"
              onChange={(e) => setAnswer(e.target.value)}
            ></textarea>
            <br />
            {answerError && <Error message={answerError} />}
            <br />
            <button type="submit">Post Answer</button>
          </div>
        </form>
      </section>
    </LayOut>
  );
}

export default Answer;
