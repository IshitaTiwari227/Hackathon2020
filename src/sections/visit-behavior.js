import React, { useRef, useState } from "react";
import withStyles from "react-jss";
import {
  Tile,
  ChartContainer,
  DonutChartComponent,
  LineChartDeluxeComponent,
  BarChartVerticalComponent,
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
      value: 4800987,
      oldValue: 2600678,
      percentageValue: 39.2,
    },
    {
      type: "Negative Tweets",
      value: 42005875,
      oldValue: 860089798,
      percentageValue: 22,
    },
    {
      type: "Neutral Tweets",
      value: 37890588,
      oldValue: 8600768,
      percentageValue: 38.8,
    },
  ];

  const dataIndia = [
    {
      type: "Positive Tweets",
      percentageValue: 46,
    },
    {
      type: "Negative Tweets",
      percentageValue: 12,
    },
    {
      type: "Neutral Tweets",
      percentageValue: 42,
    },
  ];

  const dataUS = [
    {
      type: "Positive Tweets",
      percentageValue: 40.2,
    },
    {
      type: "Negative Tweets",
      percentageValue: 45.2,
    },
    {
      type: "Neutral Tweets",
      percentageValue: 14.6,
    },
  ];

  const dataBrazil = [
    {
      type: "Positive Tweets",
      percentageValue: 12,
    },
    {
      type: "Negative Tweets",
      percentageValue: 60,
    },
    {
      type: "Neutral Tweets",
      percentageValue: 28,
    },
  ];

  const dataChina = [
    {
      type: "Positive Tweets",
      percentageValue: 57,
    },
    {
      type: "Negative Tweets",
      percentageValue: 17,
    },
    {
      type: "Neutral Tweets",
      percentageValue: 26,
    },
  ];

  const dataJapan = [
    {
      type: "Positive Tweets",
      percentageValue: 28,
    },
    {
      type: "Negative Tweets",
      percentageValue: 34,
    },
    {
      type: "Neutral Tweets",
      percentageValue: 38,
    },
  ];

  return (
    <div ref={pageRef}>
      <PageTitle>SENTIMENT ANALYSIS OF TWITTER DATA</PageTitle>
      <Tile title="OVERVIEW">
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
          problems.
          <p>
            Tweets may help reveal Twitter users’ levels of loneliness and could
            thus be used to help target interventions that alleviate morbidities
            in this condition, according to results of a statistical analysis
            published in BMJ Open.
          </p>
        </div>
      </Tile>
      <Tile title="SENTIMENT ANALYSIS">
        <ChartContainer title="" className={classes.barchartContainer}>
          <LineChartDeluxeComponent />
        </ChartContainer>

        <div className={classes.textContainer}>
          Sentiment analysis is the automated process of analyzing text data and
          sorting it into sentiments positive, negative, or neutral. Using
          sentiment analysis tools to analyze opinions in Twitter data can help
          companies understand how people are talking about their brand.
          Sentiment analysis (a.k.a opinion mining) is the automated process of
          identifying and extracting the subjective information that underlies a
          text. This can be either an opinion, a judgment, or a feeling about a
          particular topic or subject. The most common type of sentiment
          analysis is called ‘polarity detection’ and involves classifying a
          statement as ‘positive’, ‘negative’, or ‘neutral’.
        </div>
      </Tile>

      <Tile title="BREAKDOWN OF OVERALL TWEETS">
        <ChartContainer title="" className={chartContainer}>
          <DonutChartComponent
            overall={true}
            data={data}
            displayTotal="18762345132"
          />
        </ChartContainer>
        <ChartContainer title="" className={chartContainer}>
          <div className={classes.textContainer}>
          Breakdown of overall tweets from different parts of the world from Jamuary 2020 till date.
          </div>
        </ChartContainer>
      </Tile>
      <Tile title="GEOGRAPHIC BREAKDOWN OF TWEETS">
        <ChartContainer title="India" className={classes.donutchartContainer}>
          <DonutChartComponent
            overall={true}
            data={dataIndia}
            displayTotal="87623451"
          />
        </ChartContainer>
        <ChartContainer title="US" className={classes.donutchartContainer}>
          <DonutChartComponent
            overall={true}
            data={dataUS}
            displayTotal="62323451"
          />
        </ChartContainer>
        <ChartContainer title="Brazil" className={classes.donutchartContainer}>
          <DonutChartComponent
            overall={true}
            data={dataBrazil}
            displayTotal="43289044"
          />
        </ChartContainer>
        <ChartContainer title="China" className={classes.chartContainermiddle}>
          <DonutChartComponent
            overall={true}
            data={dataChina}
            displayTotal="14562314"
          />
        </ChartContainer>
        <ChartContainer title="Japan" className={classes.chartContainermiddle}>
          <DonutChartComponent
            overall={true}
            data={dataJapan}
            displayTotal="23678256"
          />
        </ChartContainer>
        <div className={classes.textContainer}>
           While this pandemic has continued to
          affect the lives of millions, a number of countries have resorted to
          complete lockdown. During this lockdown, people have taken social
          networks to express their feelings and find a way to calm themselves
          down. In this analysis, country wise sentiment analysis of the
          tweets has been done. This analysis has taken into account the
          tweets from five countries. These tweets have been gathered from
          11th March 2020 to 31st March 2020, and are related to COVID19 in some
          or the other way. This analysis has been done to analyse how the
          citizens of different countries are dealing with the situation. The
          tweets have been collected, pre-processed, and then used for text
          mining and sentiment analysis. The results of the study concludes that
          while majority of the people throughout the world are taking a
          positive and hopeful approach, there are instances of fear, sadness
          and disgust exhibited worldwide.
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
