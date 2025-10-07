import React, {useRef, useState, useEffect} from 'react';
import {View, Alert, Platform, PermissionsAndroid} from 'react-native';
import {WebView} from 'react-native-webview';
import {CurrentConfig} from '../../../../api_config';
import {APIConstants} from '../../../constants';
import {useSelector} from 'react-redux';

const UploadWebView = ({setDocuments, setDocError}) => {
  const webViewRef = useRef(null);

  const globalData = useSelector((state: any) => state.globalReducer);

  const token = globalData.userdata.token;
  const uploadURL = `${CurrentConfig.api_url}${APIConstants.FILE_UPLOAD}`;

  // HTML content with file upload
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>File Upload</title>
      <style>
          .upload-area {
              padding-top:10px;
              padding-bottom:10px;
              border: 2px dashed #ccc;
              border-radius: 10px;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              font-family: Arial, sans-serif;
              color: #888;
          }

          .upload-area:hover {
              background-color: #f0f0f0;
              color: #555;
          }

          #fileInput {
              display: none;
          }

          .remove-cross {
          display: none;
          position: absolute;
          top: 10px;
          right: 18px;
          font-size: 18px;
          color: #f44336;
          cursor: pointer;
          font-weight: bold;
      }

      .remove-cross:hover {
          color: #d32f2f;
      }
      </style>
    </head>
    <body>
      
      <!-- Clickable upload area -->
      <div class="upload-area" id="uploadArea">
          Click here to upload a file

         <span class="remove-cross" id="removeCross">&times;</span>
      </div>

      <input type="file" id="fileInput" name="file" accept="*/*" />

    <script>
          
       
      </script>
    </body>
    </html>
  `;

  const injectedJavascript = `
  const uploadArea = document.getElementById('uploadArea');
          const fileInput = document.getElementById('fileInput');
          const removeCross = document.getElementById('removeCross');

          uploadArea.addEventListener('click', () => {
              fileInput.click();
          });

          fileInput.addEventListener('change', event => {
            const file = event.target.files[0];
            if (file) {
              const file = event.target.files[0];
                  
                  uploadArea.textContent = file.name ;
                  uploadArea.appendChild(removeCross); // Re-append the button to keep it visible
                   removeCross.style.display = 'inline-block';
                    handleFileUpload(file); 
                    // window.ReactNativeWebView.postMessage(file.name);
            }
          });


      removeCross.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent triggering file selection when clicking remove
        fileInput.value = ''; // Clear the file input value
        uploadArea.textContent = 'Click here to upload a file';
        removeCross.style.display = 'none'; // Hide remove button
         window.ReactNativeWebView.postMessage('remove')
    });
  
  
  const handleFileUpload = async (file) => {
        const formData = new FormData();
        formData.append('file', file); // Append the file to the form data


        const response = await fetch('${uploadURL}', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + '${token}', // Include the token in the headers
                },
                body: formData,
            });


            const result = await response.json(); 

            window.ReactNativeWebView.postMessage(result.tmpName)

        
    };`;

  const handleWebViewMessage = async event => {
    const data = event.nativeEvent.data;

    // console.log('get-result', data);
    if (data === 'remove') {
      setDocuments(null);
      setDocError(true);
    } else {
      setDocuments(data);
      setDocError(false);
    }
  };

  return (
    <WebView
      ref={webViewRef}
      originWhitelist={['*']}
      source={{html: htmlContent}}
      injectedJavaScript={injectedJavascript}
      javaScriptEnabled={true}
      scrollEnabled={false}
      nestedScrollEnabled={false}
      allowFileAccessFromFileURLs={true}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      allowFileAccess={true}
      androidLayerType="software"
      onMessage={handleWebViewMessage} // Listen for file upload events
      style={{height: 52, marginTop: 10}}
    />
  );
};

export default UploadWebView;
