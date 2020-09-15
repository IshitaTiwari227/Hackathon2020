import React, { useRef, useState } from "react";
import withStyles from "react-jss";
import { Tile, ChartContainer,DonutChartComponent,LineChartDeluxeComponent } from "../components";
import { max } from "d3-array";
import useWidth from "../utils/useWidth";
import {
  RoundedBarChart,
 EventLineChart,
BubbleChart
} from "../viz-components";
import PageTitle from "../components/page-title";

const componentStyles = {
  chartContainer: {
    // marginTop: "50px",
    margin: "50px 20px",
    width: "calc(50% - 40px)"
  },

  textContainer: {
    // marginTop: "50px",
    margin: "50px -5px",
    width: "100%",
    textAlign:"left",
    fontSize:"16px"
  }
};

const RoundedBarData = [
  {
    "Start Date": "May 01, 2019",
    "End Date": "May 07, 2019",
    "Total Visits": 1999149,
    "Repeat Visits": 463723
  },
  {
    "Start Date": "May 08, 2019",
    "End Date": "May 14, 2019",
    "Total Visits": 1061447,
    "Repeat Visits": 366300
  },
  {
    "Start Date": "May 15, 2019",
    "End Date": "May 21, 2019",
    "Total Visits": 1172688,
    "Repeat Visits": 336074
  },
  {
    "Start Date": "May 22, 2019",
    "End Date": "May 28, 2019",
    "Total Visits": 1282223,
    "Repeat Visits": 63425
  },
  {
    "Start Date": "May 29, 2019",
    "End Date": "Jun 04, 2019",
    "Total Visits": 1070019,
    "Repeat Visits": 140750
  },
  {
    "Start Date": "Jun 05, 2019",
    "End Date": "Jun 11, 2019",
    "Total Visits": 1150027,
    "Repeat Visits": 482044
  },
  {
    "Start Date": "Jun 12, 2019",
    "End Date": "Jun 18, 2019",
    "Total Visits": 1799519,
    "Repeat Visits": 366715
  },
  {
    "Start Date": "Jun 19, 2019",
    "End Date": "Jun 25, 2019",
    "Total Visits": 1685478,
    "Repeat Visits": 312023
  },
  {
    "Start Date": "Jun 26, 2019",
    "End Date": "Jul 02, 2019",
    "Total Visits": 1253451,
    "Repeat Visits": 271447
  },
  {
    "Start Date": "Jul 03, 2019",
    "End Date": "Jul 09, 2019",
    "Total Visits": 1684210,
    "Repeat Visits": 184236
  },
  {
    "Start Date": "Jul 10, 2019",
    "End Date": "Jul 16, 2019",
    "Total Visits": 1522510,
    "Repeat Visits": 478080
  },
  {
    "Start Date": "Jul 17, 2019",
    "End Date": "Jul 23, 2019",
    "Total Visits": 1132452,
    "Repeat Visits": 80884
  },
  {
    "Start Date": "Jul 24, 2019",
    "End Date": "Jul 30, 2019",
    "Total Visits": 1874160,
    "Repeat Visits": 238035
  }
].map(row => ({
  ...row,
  startEndDate: `${row["Start Date"]}-${row["End Date"]}`
}));

const avgEngagementData = [
  { Date: "May 01, 2019", Engagement: 1.4 },
  { Date: "May 02, 2019", Engagement: 1.8 },
  { Date: "May 03, 2019", Engagement: 2.9 },
  { Date: "May 04, 2019", Engagement: 1.8 },
  { Date: "May 05, 2019", Engagement: 2.7 },
  { Date: "May 06, 2019", Engagement: 1.5 },
  { Date: "May 07, 2019", Engagement: 1.4 },
  { Date: "May 08, 2019", Engagement: 1.7 },
  { Date: "May 09, 2019", Engagement: 1.4 },
  { Date: "May 10, 2019", Engagement: 2.5 },
  { Date: "May 11, 2019", Engagement: 2.1 },
  { Date: "May 12, 2019", Engagement: 1.6 },
  { Date: "May 13, 2019", Engagement: 1.7 },
  { Date: "May 14, 2019", Engagement: 1.5 },
  { Date: "May 15, 2019", Engagement: 1.4 },
  { Date: "May 16, 2019", Engagement: 2.8 },
  { Date: "May 17, 2019", Engagement: 1.3 },
  { Date: "May 18, 2019", Engagement: 2 },
  { Date: "May 19, 2019", Engagement: 3 },
  { Date: "May 20, 2019", Engagement: 2.5 },
  { Date: "May 21, 2019", Engagement: 1.1 },
  { Date: "May 22, 2019", Engagement: 1.7 },
  { Date: "May 23, 2019", Engagement: 2.4 },
  { Date: "May 24, 2019", Engagement: 1.5 },
  { Date: "May 25, 2019", Engagement: 1 },
  { Date: "May 26, 2019", Engagement: 3 },
  { Date: "May 27, 2019", Engagement: 2.9 },
  { Date: "May 28, 2019", Engagement: 1.9 },
  { Date: "May 29, 2019", Engagement: 3 },
  { Date: "May 30, 2019", Engagement: 1.2 },
  { Date: "May 31, 2019", Engagement: 1.4 },
  { Date: "Jun 01, 2019", Engagement: 2.5 },
  { Date: "Jun 02, 2019", Engagement: 1.9 },
  { Date: "Jun 03, 2019", Engagement: 2.9 },
  { Date: "Jun 04, 2019", Engagement: 2.4 },
  { Date: "Jun 05, 2019", Engagement: 1.3 },
  { Date: "Jun 06, 2019", Engagement: 1 },
  { Date: "Jun 07, 2019", Engagement: 2.5 },
  { Date: "Jun 08, 2019", Engagement: 3 },
  { Date: "Jun 09, 2019", Engagement: 2.4 },
  { Date: "Jun 10, 2019", Engagement: 2.2 },
  { Date: "Jun 11, 2019", Engagement: 1.5 },
  { Date: "Jun 12, 2019", Engagement: 1 },
  { Date: "Jun 13, 2019", Engagement: 1.7 },
  { Date: "Jun 14, 2019", Engagement: 1.5 },
  { Date: "Jun 15, 2019", Engagement: 1.1 },
  { Date: "Jun 16, 2019", Engagement: 2.3 },
  { Date: "Jun 17, 2019", Engagement: 2.4 },
  { Date: "Jun 18, 2019", Engagement: 2.2 },
  { Date: "Jun 19, 2019", Engagement: 3 },
  { Date: "Jun 20, 2019", Engagement: 2.5 },
  { Date: "Jun 21, 2019", Engagement: 2.3 },
  { Date: "Jun 22, 2019", Engagement: 2.4 },
  { Date: "Jun 23, 2019", Engagement: 2.2 },
  { Date: "Jun 24, 2019", Engagement: 1.2 },
  { Date: "Jun 25, 2019", Engagement: 1.4 },
  { Date: "Jun 26, 2019", Engagement: 2.7 },
  { Date: "Jun 27, 2019", Engagement: 2.7 },
  { Date: "Jun 28, 2019", Engagement: 2 },
  { Date: "Jun 29, 2019", Engagement: 2.6 },
  { Date: "Jun 30, 2019", Engagement: 2.5 },
  { Date: "Jul 01, 2019", Engagement: 2.9 },
  { Date: "Jul 02, 2019", Engagement: 2.4 },
  { Date: "Jul 03, 2019", Engagement: 1.3 },
  { Date: "Jul 04, 2019", Engagement: 1.5 },
  { Date: "Jul 05, 2019", Engagement: 2 },
  { Date: "Jul 06, 2019", Engagement: 2 },
  { Date: "Jul 07, 2019", Engagement: 2.1 },
  { Date: "Jul 08, 2019", Engagement: 1.9 },
  { Date: "Jul 09, 2019", Engagement: 1.3 },
  { Date: "Jul 10, 2019", Engagement: 2.5 },
  { Date: "Jul 11, 2019", Engagement: 2.8 },
  { Date: "Jul 12, 2019", Engagement: 2.9 },
  { Date: "Jul 13, 2019", Engagement: 2.3 },
  { Date: "Jul 14, 2019", Engagement: 1.5 },
  { Date: "Jul 15, 2019", Engagement: 2.1 },
  { Date: "Jul 16, 2019", Engagement: 2.3 },
  { Date: "Jul 17, 2019", Engagement: 2.2 },
  { Date: "Jul 18, 2019", Engagement: 1.3 },
  { Date: "Jul 19, 2019", Engagement: 2.3 },
  { Date: "Jul 20, 2019", Engagement: 1 },
  { Date: "Jul 21, 2019", Engagement: 1.3 },
  { Date: "Jul 22, 2019", Engagement: 2.8 },
  { Date: "Jul 23, 2019", Engagement: 1.6 },
  { Date: "Jul 24, 2019", Engagement: 2.9 },
  { Date: "Jul 25, 2019", Engagement: 2.7 },
  { Date: "Jul 26, 2019", Engagement: 1.4 },
  { Date: "Jul 27, 2019", Engagement: 2.5 },
  { Date: "Jul 28, 2019", Engagement: 1.5 },
  { Date: "Jul 29, 2019", Engagement: 1.6 },
  { Date: "Jul 30, 2019", Engagement: 1.1 },
  { Date: "Jul 31, 2019", Engagement: 1.9 }
];

const bubbleData = [
  { name: "Desktop", value: 0.62 },
  { name: "Mobile", value: 0.25 },
  { name: "Tablet", value: 0.13 }
];

const VisitBehaviorPage = ({ classes }) => {
  const { chartContainer } = classes;
  const pageRef = useRef();
  const chartWidth = max([0, (useWidth(pageRef) - 50) / 2 - 80]);
  const [Toggle, setToggle] = useState("Marketplace");

  return (
    <div ref={pageRef}>
      <PageTitle>Mental Health Analysis</PageTitle>
      <Tile title="HIGHLIGHTS" 
      // showMarketplaceToggle={false} showDivider={false} onMarketplaceChange={Toggle => setToggle(Toggle)}
      >
        <div className={classes.textContainer}>
        Mental health includes our emotional, psychological, and social well-being. It affects how we think, feel, and act. It also helps determine how we handle stress, relate to others, and make choices. Mental health is important at every stage of life, from childhood and adolescence through adulthood.

Over the course of your life, if you experience mental health problems, your thinking, mood, and behavior could be affected. Many factors contribute to mental health problems, including:

Biological factors, such as genes or brain chemistry.
Life experiences, such as trauma or abuse.
Family history of mental health problems</div>
      </Tile>
      <Tile title="HEADING" 
      // onMarketplaceChange={Toggle => setToggle(Toggle)}
      >
        <ChartContainer title="Sub Heading"  className={chartContainer}>
          <RoundedBarChart
            width={chartWidth}
            height={300}
            data={RoundedBarData}
            dimName="startEndDate"
            barMeasName="Total Visits"
            symbolMeasName="Repeat Visits"
          />
        </ChartContainer>
        <ChartContainer
          title="Desciption"
          className={chartContainer}
        >
           <div className={classes.textContainer}>
        Mental health includes our emotional, psychological, and social well-being. It affects how we think, feel, and act. It also helps determine how we handle stress, relate to others, and make choices. Mental health is important at every stage of life, from childhood and adolescence through adulthood.

Over the course of your life, if you experience mental health problems, your thinking, mood, and behavior could be affected. Many factors contribute to mental health problems, including:

Biological factors, such as genes or brain chemistry.
Life experiences, such as trauma or abuse.
Family history of mental health problems</div>
        </ChartContainer>
        {/* <ChartContainer title="Average Engagement" className={chartContainer}>
          <EventLineChart
            width={chartWidth}
            height={300}
            data={avgEngagementData}
            dimName="Date"
            measName="Engagement"
            tooltipRender={d => (
              <>
                <div>{d["Date"]}</div>
                <div>
                  <span style={{ fontWeight: "bold" }}>{d["Engagement"]}</span>{" "}
                  pages per visit
                </div>
              </>
            )}
          />
        </ChartContainer> */}
        {/* <ChartContainer
          title="Visits by Device Platform"
          className={chartContainer}
        >
          <BubbleChart
            width={chartWidth}
            height={300}
            data={bubbleData}
            dimName="name"
            measName="value"
          />
        </ChartContainer> */}
      </Tile>
      <Tile title="HEADING" 
      // onMarketplaceChange={Toggle => setToggle(Toggle)}
      >
        {/* <ChartContainer title="Visits per Week" className={chartContainer}>
          <RoundedBarChart
            width={chartWidth}
            height={300}
            data={RoundedBarData}
            dimName="startEndDate"
            barMeasName="Total Visits"
            symbolMeasName="Repeat Visits"
          />
        </ChartContainer> */}
        <ChartContainer
          title="Sub Heading"
          className={chartContainer}
        >
          <DonutChartComponent/>
        </ChartContainer>
        <ChartContainer
          title="Desciption"
          className={chartContainer}
        >
           <div className={classes.textContainer}>
        Mental health includes our emotional, psychological, and social well-being. It affects how we think, feel, and act. It also helps determine how we handle stress, relate to others, and make choices. Mental health is important at every stage of life, from childhood and adolescence through adulthood.

Over the course of your life, if you experience mental health problems, your thinking, mood, and behavior could be affected. Many factors contribute to mental health problems, including:

Biological factors, such as genes or brain chemistry.
Life experiences, such as trauma or abuse.
Family history of mental health problems</div>
        </ChartContainer>
        {/* <ChartContainer title="Average Engagement" className={chartContainer}>
          <EventLineChart
            width={chartWidth}
            height={300}
            data={avgEngagementData}
            dimName="Date"
            measName="Engagement"
            tooltipRender={d => (
              <>
                <div>{d["Date"]}</div>
                <div>
                  <span style={{ fontWeight: "bold" }}>{d["Engagement"]}</span>{" "}
                  pages per visit
                </div>
              </>
            )}
          />
          null
        </ChartContainer> */}
        {/* <ChartContainer
          title="Visits by Device Platform"
          className={chartContainer}
        >
          <BubbleChart
            width={chartWidth}
            height={300}
            data={bubbleData}
            dimName="name"
            measName="value"
          />
        </ChartContainer> */}
      </Tile>
      <Tile title="HEADING" 
      // onMarketplaceChange={Toggle => setToggle(Toggle)}
      >
        {/* <ChartContainer title="Visits per Week" className={chartContainer}>
          <RoundedBarChart
            width={chartWidth}
            height={300}
            data={RoundedBarData}
            dimName="startEndDate"
            barMeasName="Total Visits"
            symbolMeasName="Repeat Visits"
          />
        </ChartContainer> */}
        {/* <ChartContainer
          title="Visits by Time of Day"
          className={chartContainer}
        >
          <DonutChartComponent/>
        </ChartContainer> */}
        <ChartContainer title="Sub Heading" className={chartContainer}>
          <EventLineChart
            width={chartWidth}
            height={300}
            data={avgEngagementData}
            dimName="Date"
            measName="Engagement"
            tooltipRender={d => (
              <>
                <div>{d["Date"]}</div>
                <div>
                  <span style={{ fontWeight: "bold" }}>{d["Engagement"]}</span>{" "}
                  pages per visit
                </div>
              </>
            )}
          />
        </ChartContainer>
        <ChartContainer
          title="Desciption"
          className={chartContainer}
        >
           <div className={classes.textContainer}>
        Mental health includes our emotional, psychological, and social well-being. It affects how we think, feel, and act. It also helps determine how we handle stress, relate to others, and make choices. Mental health is important at every stage of life, from childhood and adolescence through adulthood.

Over the course of your life, if you experience mental health problems, your thinking, mood, and behavior could be affected. Many factors contribute to mental health problems, including:

Biological factors, such as genes or brain chemistry.
Life experiences, such as trauma or abuse.
Family history of mental health problems</div>
        </ChartContainer>
        {/* <ChartContainer
          title="Visits by Device Platform"
          className={chartContainer}
        >
          <BubbleChart
            width={chartWidth}
            height={300}
            data={bubbleData}
            dimName="name"
            measName="value"
          />
          null
        </ChartContainer> */}
      </Tile>
      <Tile title="HEADING" 
      // onMarketplaceChange={Toggle => setToggle(Toggle)}
      >
        {/* <ChartContainer title="Visits per Week" className={chartContainer}>
          <RoundedBarChart
            width={chartWidth}
            height={300}
            data={RoundedBarData}
            dimName="startEndDate"
            barMeasName="Total Visits"
            symbolMeasName="Repeat Visits"
          />
        </ChartContainer> */}
        {/* <ChartContainer
          title="Visits by Time of Day"
          className={chartContainer}
        >
          <DonutChartComponent/>
        </ChartContainer> */}
        {/* <ChartContainer title="Average Engagement" className={chartContainer}>
          <EventLineChart
            width={chartWidth}
            height={300}
            data={avgEngagementData}
            dimName="Date"
            measName="Engagement"
            tooltipRender={d => (
              <>
                <div>{d["Date"]}</div>
                <div>
                  <span style={{ fontWeight: "bold" }}>{d["Engagement"]}</span>{" "}
                  pages per visit
                </div>
              </>
            )}
          />
        </ChartContainer> */}
        <ChartContainer
          title="Sub Heading"
          className={chartContainer}
        >
          <BubbleChart
            width={chartWidth}
            height={300}
            data={bubbleData}
            dimName="name"
            measName="value"
          />
        </ChartContainer>
        <ChartContainer
          title="Desciption"
          className={chartContainer}
        >
           <div className={classes.textContainer}>
        Mental health includes our emotional, psychological, and social well-being. It affects how we think, feel, and act. It also helps determine how we handle stress, relate to others, and make choices. Mental health is important at every stage of life, from childhood and adolescence through adulthood.

Over the course of your life, if you experience mental health problems, your thinking, mood, and behavior could be affected. Many factors contribute to mental health problems, including:

Biological factors, such as genes or brain chemistry.
Life experiences, such as trauma or abuse.
Family history of mental health problems</div>
        </ChartContainer>
      </Tile>
      <Tile title="HEADING" 
      // onMarketplaceChange={Toggle => setToggle(Toggle)}
      >
        {/* <ChartContainer title="Visits per Week" className={chartContainer}>
          <RoundedBarChart
            width={chartWidth}
            height={300}
            data={RoundedBarData}
            dimName="startEndDate"
            barMeasName="Total Visits"
            symbolMeasName="Repeat Visits"
          />
        </ChartContainer> */}
        {/* <ChartContainer
          title="Visits by Time of Day"
          className={chartContainer}
        >
          <DonutChartComponent/>
        </ChartContainer> */}
        {/* <ChartContainer title="Average Engagement" className={chartContainer}>
          <EventLineChart
            width={chartWidth}
            height={300}
            data={avgEngagementData}
            dimName="Date"
            measName="Engagement"
            tooltipRender={d => (
              <>
                <div>{d["Date"]}</div>
                <div>
                  <span style={{ fontWeight: "bold" }}>{d["Engagement"]}</span>{" "}
                  pages per visit
                </div>
              </>
            )}
          />
        </ChartContainer> */}
        <ChartContainer
          title="Sub Heading"
          className={chartContainer}
        >
          <LineChartDeluxeComponent/>
        </ChartContainer>
        <ChartContainer
          title="Desciption"
          className={chartContainer}
        >
           <div className={classes.textContainer}>
        Mental health includes our emotional, psychological, and social well-being. It affects how we think, feel, and act. It also helps determine how we handle stress, relate to others, and make choices. Mental health is important at every stage of life, from childhood and adolescence through adulthood.

Over the course of your life, if you experience mental health problems, your thinking, mood, and behavior could be affected. Many factors contribute to mental health problems, including:

Biological factors, such as genes or brain chemistry.
Life experiences, such as trauma or abuse.
Family history of mental health problems</div>
        </ChartContainer>
      </Tile>
      {/* <Tile title="VISIT ACTIVITY" 
      // onMarketplaceChange={Toggle => setToggle(Toggle)}
      >
        <ChartContainer title="Visits per Week" className={chartContainer}>
          <RoundedBarChart
            width={chartWidth}
            height={300}
            data={RoundedBarData}
            dimName="startEndDate"
            barMeasName="Total Visits"
            symbolMeasName="Repeat Visits"
          />
        </ChartContainer>
        <ChartContainer
          title="Visits by Time of Day"
          className={chartContainer}
        >
          <DonutChartComponent/>
        </ChartContainer>
        <ChartContainer title="Average Engagement" className={chartContainer}>
          <EventLineChart
            width={chartWidth}
            height={300}
            data={avgEngagementData}
            dimName="Date"
            measName="Engagement"
            tooltipRender={d => (
              <>
                <div>{d["Date"]}</div>
                <div>
                  <span style={{ fontWeight: "bold" }}>{d["Engagement"]}</span>{" "}
                  pages per visit
                </div>
              </>
            )}
          />
        </ChartContainer>
        <ChartContainer
          title="Visits by Device Platform"
          className={chartContainer}
        >
          <BubbleChart
            width={chartWidth}
            height={300}
            data={bubbleData}
            dimName="name"
            measName="value"
          />
        </ChartContainer>
      </Tile> */}
    </div>
  );
};

export default withStyles(componentStyles)(VisitBehaviorPage);
