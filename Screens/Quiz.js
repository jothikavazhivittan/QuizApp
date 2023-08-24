import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';

const shuffleArray = array => {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

const Quiz = ({navigation}) => {
  const [questions, setQuestions] = useState();
  const [ques, setQues] = useState(0);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const getQuiz = async () => {
    setIsLoading(true);
    const uri =
      'https://opentdb.com/api.php?amount=25&category=18&difficulty=easy&type=multiple&encode=url3986';
    const res = await fetch(uri);
    const data = await res.json();
    setQuestions(data.results);
    setOptions(generateOptionsAndShuffle(data.results[0]));
    setIsLoading(false);
  };

  useEffect(() => {
    getQuiz();
  }, []);

  const handleNextPress = () => {
    setQues(ques + 1);
    setOptions(generateOptionsAndShuffle(questions[ques + 1]));
  };
  const generateOptionsAndShuffle = _question => {
    const options = [..._question.incorrect_answers];
    options.push(_question.correct_answer);

    shuffleArray(options);
    return options;
  };
  const handledSelectedOption = _option => {
    if (_option === questions[ques].correct_answer) {
      setScore(score + 5);
    }
    if (ques !== 24) {
      setQues(ques + 1);
      setOptions(generateOptionsAndShuffle(questions[ques + 1]));
    }
    if (ques === 24) {
      handledShowResult();
    }
  };
  const handledShowResult = () => {
    navigation.navigate('Result', {
      score: score,
    });
  };
  return (
    <View style={styles.container}>
      {isLoading ? (
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 32, fontWeight: '800',color:"black"}}>LOADING...</Text>
        </View>
      ) : (
        questions && (
          <View style={styles.parent}>
            <View style={styles.top}>
              <Text style={styles.question}>
                Q.{decodeURIComponent(questions[ques].question)}
              </Text>
            </View>
            <View style={styles.options}>
              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => handledSelectedOption(options[0])}>
                <Text style={styles.option}>
                  A.{decodeURIComponent(options[0])}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => handledSelectedOption(options[1])}>
                <Text style={styles.option}>
                  B.{decodeURIComponent(options[1])}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => handledSelectedOption(options[2])}>
                <Text style={styles.option}>
                  C.{decodeURIComponent(options[2])}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => handledSelectedOption(options[3])}>
                <Text style={styles.option}>
                  D.{decodeURIComponent(options[3])}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.bottom}>
              {/* <TouchableOpacity style={styles.botton}>
        <Text style={styles.bottonText}>PREV</Text>
      </TouchableOpacity> */}

              {ques !== 24 && (
                <TouchableOpacity
                  style={styles.botton}
                  onPress={handleNextPress}>
                  <Text style={styles.bottonText}>NEXT</Text>
                </TouchableOpacity>
              )}

              {ques == 24 && (
                <TouchableOpacity
                  style={styles.botton}
                  onPress={handledShowResult}>
                  <Text style={styles.bottonText}>SHOW RESULTS</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )
      )}
    </View>
  );
};

export default Quiz;

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 20,
    height: '100%',
  },
  top: {
    marginVertical: 16,
  },
  options: {
    marginVertical: 19,
    flex: 1,
  },
  bottom: {
    marginBottom: 12,
    paddingVertical: 16,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  botton: {
    backgroundColor: '#FF019E',
    padding: 18,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginBottom: 30,
    alignItems: 'center',
  },
  bottonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  option: {
    fontSize: 12,
    fontWeight: '600',
    color: 'black',
  },
  optionButton: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginVertical: 4,
    backgroundColor: '#08CEE4',
    borderRadius: 12,
  },
  question: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
  },
  parent: {
    height: '100%',
  },
});
