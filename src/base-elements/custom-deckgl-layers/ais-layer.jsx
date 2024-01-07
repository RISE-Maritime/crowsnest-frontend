import { Layer, project32, picking } from "@deck.gl/core"
import GL from "@luma.gl/constants"
import { Model, Geometry } from "@luma.gl/core"

import vs from "./ais-layer-vertex.glsl"
import fs from "./ais-layer-fragment.glsl"

const DEFAULT_COLOR = [255, 0, 0, 255]

const defaultProps = {
  getCoordinates: { type: "accessor", value: x => [x.latitude, x.longitude] },
  getHeading: { type: "accessor", value: 0.0 },
  getSpeed: { type: "accessor", value: 0.0 },
  getFillColor: { type: "accessor", value: DEFAULT_COLOR },
}

export default class AisTargetLayer extends Layer {
  getShaders() {
    return super.getShaders({ vs, fs, modules: [project32, picking] })
  }

  initializeState() {
    this.getAttributeManager().addInstanced({
      instancePositions: {
        size: 3,
        type: GL.DOUBLE,
        fp64: this.use64bitPositions(),
        transition: true,
        accessor: "getCoordinates",
      },
      instanceHeading: {
        size: 1,
        transition: true,
        accessor: "getHeading",
        defaultValue: 0,
      },
      instanceCourse: {
        size: 1,
        transition: true,
        accessor: "getCourse",
        defaultValue: 0,
      },
      instanceSpeed: {
        size: 1,
        transition: true,
        accessor: "getSpeed",
        defaultValue: 0,
      },
      instanceTimestamp: {
        size: 1,
        transition: true,
        accessor: "getTimestamp",
        defaultValue: 0,
      },
      instanceFillColors: {
        size: this.props.colorFormat.length,
        transition: true,
        normalized: true,
        type: GL.UNSIGNED_BYTE,
        accessor: "getFillColor",
        defaultValue: [0, 255, 0, 255],
      },
    })
  }

  updateState({ props, oldProps, changeFlags }) {
    super.updateState({ props, oldProps, changeFlags })
    if (changeFlags.extensionsChanged) {
      const { gl } = this.context
      this.state.model?.delete()
      this.state.model = this._getModel(gl)
      this.getAttributeManager().invalidateAll()
    }
  }

  draw({ uniforms }) {
    super.draw({
      uniforms: {
        ...uniforms,
        iconSize: this.props.iconSize,
        currentTime: this.props.currentTime,
      },
    })
  }

  _getModel(gl) {
    const vertices = [0, 0, 0, -0.4, -0.25, 0, 0, 1, 0, 0.4, -0.25, 0]

    return new Model(gl, {
      ...this.getShaders(),
      id: this.props.id,
      geometry: new Geometry({
        drawMode: GL.TRIANGLE_FAN,
        vertexCount: 4,
        attributes: {
          vertices: { size: 3, value: new Float32Array(vertices) },
        },
      }),
      isInstanced: true,
    })
  }
}

AisTargetLayer.layerName = "AisTargetLayer"
AisTargetLayer.defaultProps = defaultProps
