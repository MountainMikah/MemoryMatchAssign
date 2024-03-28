import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, Vibration } from 'react-native';
import { useState, useEffect } from 'react';
import FlipCard from 'react-native-flip-card';
import { Audio } from 'expo-av';

export default function App() {

    //Create the images here (Hard code what images at first for testing purposes)
     const matchCards = [
        {key:1, id:1, filepath:require('./imgSrc/imageOne.png') },
        {key:2, id:2, filepath:require('./imgSrc/imageTwo.png')},
        {key:3, id:3, filepath:require('./imgSrc/imageThree.png')},
        {key:4, id:4, filepath: require('./imgSrc/imageFour.png') },
        {key:5, id:1, filepath: require('./imgSrc/imageOne.png') },
        {key:6, id:2, filepath: require('./imgSrc/imageTwo.png') },
        {key:7, id:3, filepath: require('./imgSrc/imageThree.png') },
        {key:8, id:4, filepath: require('./imgSrc/imageFour.png') },
     ] 
    
    const [doFlip, setDoFlip] = useState(false);
     //track what img for the cards
    const [cards, setCards] = useState([]);
    //track score
    const [score, setScore] = useState(0);
    //track which cards are currently being flipped/checked
    const [flippedCard1, setFlippedCard1] = useState(null);
    const [flippedCard2, setFlippedCard2] = useState(null);

    const [isMatched, setIsMatched] = useState(true);

    //Shuffle "cards"
    //Use two instances of the images to create a pair for matching purposes later
    const shuffleMatch = () => {
        const cardHolder = {matchCards}
        const postShuffle = [...matchCards, ...matchCards]    
        .sort(() => Math.random() -0.5)
            .map((cards) => ({ ...cards, id: Math.random() }))
        //Flips all the cards, helpful for reset, but doesn't check if cards should be flipped or not
        if (doFlip) {
            setDoFlip(false)
        }
        else {
            setDoFlip(true);
        }
        setCards(postShuffle);
        setFlippedCard1(null);
        setFlippedCard2(null);
        setScore(0);
    }
    
    const testFlipEnd = async (card) => {
        Vibration.vibrate();
        if (flippedCard1 == null) {
            setFlippedCard1({ card });
        }
        else if (flippedCard2 == null) {
            setFlippedCard2({ card });
        }

        if (flippedCard1 == flippedCard2 && flippedCard1 != null && flippedCard2 != null) {
            setScore(+1);
            setFlippedCard1(null);
            setFlippedCard2(null);
        }
        console.log({ flippedCard1 })
        console.log({ flippedCard2 })
    }
  return (
      <View style={styles.container}>
          <Text>Matching Card Game</Text>
          <Button title="Shuffle Cards" onPress={shuffleMatch}></Button>
          <Text>The Current Score is: {score}</Text>
          <View style={styles.cardContainer}>
              <View style={styles.row}>
                  {matchCards.slice(0, 8).map((card) => (
                      <FlipCard key={card.key} id={card.id} style={styles.card} flip={doFlip} clickable={isMatched} onFlipEnd={(isFlipEnd) => { testFlipEnd(card.id) }} >
                          {/* Face Side */}
                          <View style={styles.face}>
                              <Image source={require('./imgSrc/imageBack.png')} />
                          </View>
                          {/* Back Side */}
                          <View style={styles.back}>
                              <Image source={card.filepath} />
                          </View>
                      </FlipCard>
                  ))}
              </View>
          </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'top',
        marginTop: 50,
    },
    cardContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: 10,
    },
    card: {
        width: 75, 
        height: 75,
        margin: 5,
    },
    face: {
        width: '100%',
        height: '100%',
        flexWrap: 'wrap',

    },
    back: {
        width: '100%',
        height: '100%',
        flexWrap: 'wrap',

    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginBottom: 70,
    },
});
