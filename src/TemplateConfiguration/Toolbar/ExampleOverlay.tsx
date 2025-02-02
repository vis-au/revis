import * as React from 'react';
import { SpecParser, Template } from 'remodel-vis';

import { barchartSpec as barchartPreset, bubbleChartAltairPreset, candlestickSpec as candlestickPreset, carbonDioxide as carbonDioxidePreset, concatenateSpec as concatenatePreset, facettedBarchartsPreset, londonTube as londonTubePrest, mosaicPreset, moviesAltairPreset, parallelCoordinatesPreset, populationLayerChart as populationLayerChartPreset, repeatOverlayPreset, scatterplotMatrixSpec as scatterplotMatrixPreset, stackedAreaPreset, stackedBarchartPreset, streamGraphPreset, trellisBarleyPreset } from './SpecPresets';

import './ExampleOverlay.css';

interface Props {
  hidden: boolean;
  addTemplates: (templates: Template[]) => void;
  hide: () => void;
}
interface State {
}

export default class ExampleOverlay extends React.Component<Props, State> {
  private vegaLiteExamples: Map<string, any>;
  private schemaParser: SpecParser;

  constructor(props: Props) {
    super(props);

    this.vegaLiteExamples = new Map();
    this.schemaParser = new SpecParser();

    this.renderExample = this.renderExample.bind(this);
    this.onAddButtonClicked = this.onAddButtonClicked.bind(this);

    this.addExamplesToMap();
  }

  private addExamplesToMap() {
    this.vegaLiteExamples.set('population', populationLayerChartPreset);
    this.vegaLiteExamples.set('barchart', barchartPreset);
    this.vegaLiteExamples.set('scattMatrx', scatterplotMatrixPreset);
    this.vegaLiteExamples.set('candlestick', candlestickPreset);
    this.vegaLiteExamples.set('concat', concatenatePreset);
    this.vegaLiteExamples.set('stackedBC', stackedBarchartPreset);
    this.vegaLiteExamples.set('parallelCoords', parallelCoordinatesPreset);
    this.vegaLiteExamples.set('repeatOverlay', repeatOverlayPreset);
    this.vegaLiteExamples.set('mosaic', mosaicPreset);
    this.vegaLiteExamples.set('streamGraph', streamGraphPreset);
    this.vegaLiteExamples.set('stackedArea', stackedAreaPreset);
    this.vegaLiteExamples.set('CO2', carbonDioxidePreset);
    this.vegaLiteExamples.set('londonTube', londonTubePrest);
    this.vegaLiteExamples.set('trellisBarley', trellisBarleyPreset);
    this.vegaLiteExamples.set('facettedBarchart', facettedBarchartsPreset);
    this.vegaLiteExamples.set('bubblechart', bubbleChartAltairPreset);
    this.vegaLiteExamples.set('movies', moviesAltairPreset);
  }

  private onAddButtonClicked(exampleSchema: any) {
    const parsedTemplate = this.schemaParser.parse(exampleSchema);
    this.props.addTemplates(parsedTemplate.getFlatHierarchy());
    this.props.hide();
  }

  private renderExample(exampleSchema: any, exampleKey: string) {
    return (
      <div key={ exampleKey } className="example">
        <button className="addExample" onClick={ () => this.onAddButtonClicked(exampleSchema) }>
          { exampleKey }
        </button>
      </div>
    );
  }

  private renderExamples() {
    const examples: JSX.Element[] = [];

    this.vegaLiteExamples.forEach((exampleSchema: any, exampleKey: string) => {
      examples.push(this.renderExample(exampleSchema, exampleKey));
    });

    return (
      <div className="examples">
        { examples }
      </div>
    );
  }

  public render() {
    const isHidden = this.props.hidden ? 'hidden' : '';

    return (
      <div className={ `exampleOverlay ${isHidden}` } onClick={ this.props.hide }>
        <div className="examplesContainer" onClick={ (e: any) => e.stopPropagation() }>
          <h2 className="vegaLiteExamples">
            <span>Example Vega-Lite Specs</span>
            <span onClick={ this.props.hide } className="delete"></span>
            </h2>
          <p className="message">These are some examples sourced from the <a target="_blank" rel="noopener noreferrer" href="https://vega.github.io/vega-lite/examples/">Vega Example page<i className="material-icons icon">open_in_new</i></a>, ready for you to use.</p>
          { this.renderExamples() }
        </div>
      </div>
    );
  }
}