import React, { useRef, useState } from "react";
import withStyles from "react-jss";
import {
  Tile,
  ChartContainer,
  DonutChartComponent,
  LineChartDeluxeComponent,
  BarChartVerticalComponent,
  BarChartVerticalComponentMain
} from "../components";
import PageTitle from "../components/page-title";

const componentStyles = {
  chartContainer: {
    // marginTop: "50px",
    margin: "50px 20px",
    width: "calc(50% - 40px)",
  },

  middle:{
    marginLeft:"10px",
    display:"inline-block"
  },

  chartContainermiddle: {
    // marginTop: "50px",
    margin: "50px 20px 50px 160px",
    width: "calc(30% - 40px)",
  },

  barchartContainer: {
    // marginTop: "50px",
    margin: "50px 20px",
    width: "calc(100% - 40px)",
  },

  donutchartContainer: {
    margin: "50px 20px",
    width: "calc(30% - 40px)",
  },

  textContainer: {
    // marginTop: "50px",
    margin: "50px -5px",
    width: "100%",
    textAlign: "left",
    fontSize: "16px",
  },
};

const VisitBehaviorPage = ({ classes }) => {
  const { chartContainer } = classes;
  const pageRef = useRef();

  const data = [
    {
      type: "Positive Tweets",
      percentageValue: 40.55,
    },
    {
      type: "Negative Tweets",
      percentageValue: 20.67,
    },
    {
      type: "Neutral Tweets",
      percentageValue: 38.78,
    },
  ];

  const dataUSA = [
    {
      type: "Positive Tweets",
      percentageValue: 41.07,
    },
    {
      type: "Negative Tweets",
      percentageValue: 22.59,
    },
    {
      type: "Neutral Tweets",
      percentageValue: 36.34,
    },
  ];

  const dataUK = [
    {
      type: "Positive Tweets",
      percentageValue: 43.20,
    },
    {
      type: "Negative Tweets",
      percentageValue: 21.17,
    },
    {
      type: "Neutral Tweets",
      percentageValue: 35.63,
    },
  ];

  const dataIndia = [
    {
      type: "Positive Tweets",
      percentageValue: 44.77,
    },
    {
      type: "Negative Tweets",
      percentageValue: 16.62,
    },
    {
      type: "Neutral Tweets",
      percentageValue: 38.61,
    },
  ];

  const dataCanada = [
    {
      type: "Positive Tweets",
      percentageValue: 44.42,
    },
    {
      type: "Negative Tweets",
      percentageValue: 20.33,
    },
    {
      type: "Neutral Tweets",
      percentageValue: 35.25,
    },
  ];

  const dataNigeria = [
    {
      type: "Positive Tweets",
      percentageValue: 42.89,
    },
    {
      type: "Negative Tweets",
      percentageValue: 14.83,
    },
    {
      type: "Neutral Tweets",
      percentageValue: 42.27,
    },
  ];

  return (
    <div ref={pageRef}>
      <PageTitle>SENTIMENT ANALYSIS OF TWITTER DATA</PageTitle>
      <Tile title="OVERVIEW">
        <div className={classes.textContainer}>
          Social networks are the main resources to gather information about
          people’s opinions and sentiments towards different topics and issues.
          People spend hours daily on social media to share their ideas,
          opinions, and reactions with others. Social media has played a crucial
          role in spreading awareness and knowledge about public health;
          however, it has also been misused for spreading fake news, hatred and
          creating racism during epidemics and civil unrest. This webpage deals
          with the sentiment analysis of people across country after the
          lockdown announcements were made.
        </div>
      </Tile>
      <Tile title="SENTIMENT ANALYSIS">
        <ChartContainer title="" className={classes.barchartContainer}>
          <BarChartVerticalComponentMain />
        </ChartContainer>

        <div className={classes.textContainer}>
          Analysing the sentiments of different people’s opinion is important
          and we are fetching the twitter streaming tweets related to
          coronavirus using twitter API and analyse these tweets to segregate it
          as positive, negative and neutral. In this paper, we run experiments
          through Python programming on different tweets using twitter API and
          NLTK library is used for pre-processing of tweets and then analyze the
          tweets dataset by using Textblob and after that show the interesting
          results in positive, negative, neutral sentiments through different
          visualizations.
        </div>
      </Tile>

      <Tile title="BREAKDOWN OF OVERALL TWEETS">
        <ChartContainer title="" className={chartContainer}>
          <DonutChartComponent
            overall={true}
            data={data}
            displayTotal="147000000"
          />
        </ChartContainer>
        <ChartContainer title="" className={chartContainer}>
        <BarChartVerticalComponent/>
        </ChartContainer>
       
          <div className={classes.textContainer}>
            The proliferation of social media usage for articulation of opinions
            and feelings by the common public has created possibilities of
            analysing such sentiments about any dominant and prevalent
            discourse. In respect of Coronavirus, we analysed sentiments
            expressed globally over one of the most popular social media
            interfaces i.e. Twitter – a microblogging site. The tweets were
            retrieved from Twitter with two important hashtags related to the
            pandemic – #COVID-19 and #Coronavirus – in order to study the
            perspectives of the Twitter users about the Coronavirus disease. <p>For
            the purpose of this analysis, tweets were used with hashtags. A
            sample of them are “#corona”, “#coronavirus”, “covid”, “#covid”,
            “#covid19”, “#covid-19", “#pandemic”, “#quarantine”, “#lockdown”,
            “#socialdistancing” etc. Applying the sentiment analysis to these
            tweets, it was observed that most of the tweets i.e. 40.55% expressed
            positive sentiments, while 38.78% were neutral and rest of the
            tweets-amounting to 20.67% accounted for negative sentiments. Thus, the
            findings reveal that the perception of Twitter users was mostly
            positive or neutral whenever they used any of these two hashtags
            while tweeting.</p>
          </div>
     
      </Tile>
      <Tile title="GEOGRAPHIC BREAKDOWN OF TWEETS">
        <ChartContainer title="USA" className={classes.donutchartContainer}>
          <DonutChartComponent
            overall={true}
            data={dataUSA}
            displayTotal="4193608"
          />
        </ChartContainer>
        <ChartContainer title="UK" className={classes.donutchartContainer}>
          <DonutChartComponent
            overall={true}
            data={dataUK}
            displayTotal="1002298"
          />
        </ChartContainer>
        <ChartContainer title="INDIA" className={classes.donutchartContainer}>
          <DonutChartComponent
            overall={true}
            data={dataIndia}
            displayTotal="822590"
          />
        </ChartContainer>
        <ChartContainer title="CANADA" className={classes.chartContainermiddle}>
          <DonutChartComponent
            overall={true}
            data={dataCanada}
            displayTotal="305545"
          />
        </ChartContainer>
        <ChartContainer title="NIGERIA" className={classes.chartContainermiddle}>
          <DonutChartComponent
            overall={true}
            data={dataNigeria}
            displayTotal="286742"
          />
        </ChartContainer>
        <div className={classes.textContainer}>
          While this pandemic has continued to affect the lives of millions, a
          number of countries have resorted to complete lockdown. During this
          lockdown, people have taken social networks to express their feelings
          and find a way to calm themselves down. In this research work, country
          wise sentiment analysis of the tweets has been done. This research
          work has taken into account the tweets from twelve countries. These
          tweets have been gathered from 20th March 2020 to 31st May 2020 and are
          related to COVID19. <p>This analysis has been done to analyse how the
          citizens of different countries are dealing with the situation. The
          results of the study concludes that while majority of the people
          throughout the world are taking a positive and hopeful approach, there
          are instances of fear, sadness and disgust exhibited worldwide ,these
          tweets are classified as negative in this sentiment analysis. US,
          India & Brazil have high cases of COVID-19 till now. However, there
          are signs of distrust and anger on a bigger scale from some of the
          countries.</p>
        </div>
      </Tile>

      {/* <Tile title="HEADING">
        <ChartContainer
          title="Sub Heading"
          className={classes.barchartContainer}
        >
          <BarChartVerticalComponent />
        </ChartContainer>

        <div className={classes.textContainer}>
          Mental health includes our emotional, psychological, and social
          well-being. It affects how we think, feel, and act. It also helps
          determine how we handle stress, relate to others, and make choices.
          Mental health is important at every stage of life, from childhood and
          adolescence through adulthood. Over the course of your life, if you
          experience mental health problems, your thinking, mood, and behavior
          could be affected. Many factors contribute to mental health problems,
          including: Biological factors, such as genes or brain chemistry. Life
          experiences, such as trauma or abuse. Family history of mental health
          problems
        </div>
      </Tile> */}
    </div>
  );
};

export default withStyles(componentStyles)(VisitBehaviorPage);
