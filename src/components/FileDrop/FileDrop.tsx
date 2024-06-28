import { useCallback, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';

import { useStore } from '../../stores/store';
import { Animation } from '../../types';

import { FileDropWrapper } from './styles';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
};

const focusedStyle = {
  borderColor: '#2196f3',
};

const acceptStyle = {
  borderColor: '#00e676',
};

const rejectStyle = {
  borderColor: '#ff1744',
};

export const FileDrop = () => {
  const { name, updateJson } = useStore((state) => state);

  const onDrop = useCallback((acceptedFiles: any[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        const binaryStr = reader.result;
        updateJson(name, JSON.parse(binaryStr as string) as Animation);
      };

      reader.readAsText(file);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { acceptedFiles, fileRejections, getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,
      accept: { 'application/json': [] },
    });

  const style: any = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const acceptedFileItems = acceptedFiles.map((file: any) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }: { file: any; errors: any }) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
      <ul>
        {errors.map((e: any) => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));

  return (
    <FileDropWrapper data-testid="filedrop">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />

        <p>Drag 'n' drop some files here, or click to select files</p>
        <em>(Only json files are accepted)</em>
        <aside>
          {acceptedFileItems.length > 0 && (
            <>
              <h4>Accepted files</h4>
              <p>{acceptedFileItems}</p>
            </>
          )}
          {fileRejectionItems.length > 0 && (
            <>
              <h4>Rejected files</h4>
              <p>{fileRejectionItems}</p>
            </>
          )}
        </aside>
      </div>
    </FileDropWrapper>
  );
};

export default FileDrop;
