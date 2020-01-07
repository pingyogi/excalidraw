import React from "react";
import { EditableText } from "../EditableText";

interface PanelExportProps {
  projectName: string;
  onProjectNameChange: (name: string) => void;
  onExportCanvas: (type: string) => void;
  exportBackground: boolean;
  onExportBackgroundChange: (val: boolean) => void;
  onSaveScene: React.MouseEventHandler;
  onLoadScene: React.MouseEventHandler;
}

// fa-clipboard
const ClipboardIcon = () => (
  <svg viewBox="0 0 384 512" style={{ width: 15 }}>
    <path
      fill="currentColor"
      d="M384 112v352c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h80c0-35.29 28.71-64 64-64s64 28.71 64 64h80c26.51 0 48 21.49 48 48zM192 40c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24m96 114v-20a6 6 0 0 0-6-6H102a6 6 0 0 0-6 6v20a6 6 0 0 0 6 6h180a6 6 0 0 0 6-6z"
    ></path>
  </svg>
);

const probablySupportsClipboard =
  "toBlob" in HTMLCanvasElement.prototype &&
  "write" in navigator.clipboard &&
  "ClipboardItem" in window;

export const PanelExport: React.FC<PanelExportProps> = ({
  projectName,
  exportBackground,
  onProjectNameChange,
  onExportBackgroundChange,
  onSaveScene,
  onLoadScene,
  onExportCanvas
}) => {
  return (
    <>
      <h4>Export</h4>
      <div className="panelColumn">
        <h5>Name</h5>
        {projectName && (
          <EditableText
            value={projectName}
            onChange={(name: string) => onProjectNameChange(name)}
          />
        )}
        <h5>Image</h5>
        <div
          style={{
            display: "flex"
          }}
        >
          <button
            style={{
              flex: "1 1 auto"
            }}
            onClick={() => onExportCanvas("png")}
          >
            Export to png
          </button>
          {probablySupportsClipboard && (
            <button
              style={{
                marginLeft: 10,
                padding: "0 15px"
              }}
              onClick={() => onExportCanvas("clipboard")}
              title="Copy to clipboard (experimental)"
            >
              <ClipboardIcon />
            </button>
          )}
        </div>
        <label>
          <input
            type="checkbox"
            checked={exportBackground}
            onChange={e => {
              onExportBackgroundChange(e.target.checked);
            }}
          />
          background
        </label>
        <h5>Scene</h5>
        <button onClick={onSaveScene}>Save as...</button>
        <button onClick={onLoadScene}>Load file...</button>
      </div>
    </>
  );
};
