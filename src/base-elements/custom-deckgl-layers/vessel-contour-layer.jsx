import {Layer, project32, picking} from '@deck.gl/core';
import GL from '@luma.gl/constants';
import {Model, Geometry} from '@luma.gl/core';

import vs from './vessel-contour-layer-vertex.glsl';
import fs from './vessel-contour-layer-fragment.glsl';

const DEFAULT_COLOR = [255, 0, 0, 255];

const defaultProps = {
  
  getCoordinates: {type: 'accessor', value: x => [x.latitude, x.longitude]},
  getHeading: {type: 'accessor', value: 0.0},
  getLength: {type: 'accessor', value: 0.0},
  getBeam: {type: 'accessor', value: 0.0},
  getFillColor: {type: 'accessor', value: DEFAULT_COLOR},

};

export default class VesselContourLayer extends Layer {
  getShaders() {
    return super.getShaders({vs, fs, modules: [project32, picking]});
  }

  initializeState() {
    this.getAttributeManager().addInstanced({
      instancePositions: {
        size: 3,
        type: GL.DOUBLE,
        fp64: this.use64bitPositions(),
        transition: true,
        accessor: 'getCoordinates'
      },
      instanceHeading: {
        size: 1,
        transition: true,
        accessor: 'getHeading',
        defaultValue: 0
      },
      instanceLength: {
        size: 1,
        transition: true,
        accessor: 'getLength',
        defaultValue: 20
      },
      instanceBeam: {
        size: 1,
        transition: true,
        accessor: 'getBeam',
        defaultValue: 10
      },
      instanceFillColors: {
        size: this.props.colorFormat.length,
        transition: true,
        normalized: true,
        type: GL.UNSIGNED_BYTE,
        accessor: 'getFillColor',
        defaultValue: [0, 255, 0, 255]
      },
    });
  }

  updateState({props, oldProps, changeFlags}) {
    super.updateState({props, oldProps, changeFlags});
    if (changeFlags.extensionsChanged) {
      const {gl} = this.context;
      this.state.model?.delete();
      this.state.model = this._getModel(gl);
      this.getAttributeManager().invalidateAll();
    }
  }

  draw({uniforms}) {
    const {
      radiusScale,
      radiusMinPixels,
      radiusMaxPixels,
      stroked,
      filled,
      billboard,
      antialiasing,
      lineWidthScale,
      lineWidthMinPixels,
      lineWidthMaxPixels
    } = this.props;

    this.state.model
      .setUniforms(uniforms)
      .setUniforms({
        stroked: stroked ? 1 : 0,
        filled,
        billboard,
        antialiasing,
        radiusScale,
        radiusMinPixels,
        radiusMaxPixels,
        lineWidthScale,
        lineWidthMinPixels,
        lineWidthMaxPixels
      })
      .draw();
  }

  _getModel(gl) {
    // a square that minimally cover the unit circle
    const positions = [-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, 1, 0];

    return new Model(gl, {
      ...this.getShaders(),
      id: this.props.id,
      geometry: new Geometry({
        drawMode: GL.TRIANGLE_FAN,
        vertexCount: 4,
        attributes: {
          positions: {size: 3, value: new Float32Array(positions)}
        }
      }),
      isInstanced: true
    });
  }
}

VesselContourLayer.layerName = 'VesselContourLayer';
VesselContourLayer.defaultProps = defaultProps;
