import {
  Box,
  FormLabel,
  CircularProgress,
  CircularProgressLabel,
  Icon,
  Text,
  FormControl,
  FormErrorMessage,
  Flex,
  useToast,
  Tooltip,
} from "@chakra-ui/react";
import axios, { AxiosRequestConfig, CancelTokenSource } from "axios";
import {
  useState,
  SetStateAction,
  Dispatch,
  ForwardRefRenderFunction,
  forwardRef,
  useCallback,
  useEffect,
} from "react";
import {
  FieldError,
  FieldValues,
  UseFormSetError,
  UseFormTrigger,
} from "react-hook-form";
import { FiAlertCircle, FiFile } from "react-icons/fi";

export interface FileInputProps {
  name: string;
  error?: FieldError;
  setFileUrl: Dispatch<SetStateAction<string>>;
  localFileUrl: string;
  setLocalFileUrl: Dispatch<SetStateAction<string>>;
  setError: UseFormSetError<FieldValues>;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => Promise<boolean | void>;
  trigger: UseFormTrigger<FieldValues>;
}

const FileInputBase: ForwardRefRenderFunction<
  HTMLInputElement,
  FileInputProps
> = (
  {
    name,
    error = null,
    setFileUrl,
    localFileUrl,
    setLocalFileUrl,
    setError,
    onChange,
    trigger,
    ...rest
  },
  ref
) => {
  const toast = useToast();
  const [progress, setProgress] = useState(0);
  const [isSending, setIsSending] = useState(false);
  const [cancelToken, setCancelToken] = useState<CancelTokenSource>(
    {} as CancelTokenSource
  );

  const handleFileUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
      if (!event.target.files?.length) {
        return;
      }

      setFileUrl("");
      setLocalFileUrl("");

      setIsSending(true);

      await onChange(event);
      trigger("file");

      const formData = new FormData();

      formData.append(event.target.name, event.target.files[0]);

      const { CancelToken } = axios;
      const source = CancelToken.source();
      setCancelToken(source);

      const config = {
        headers: { "content-type": "multipart/form-data" },
        onUploadProgress: (e: ProgressEvent) => {
          setProgress(Math.round((e.loaded * 100) / e.total));
        },
        cancelToken: source.token,
      } as AxiosRequestConfig;
    },
    [onChange, setFileUrl, setLocalFileUrl, trigger]
  );

  useEffect(() => {
    if (error?.message && isSending && cancelToken?.cancel) {
      cancelToken.cancel("Cancelled image upload.");
    }
  }, [cancelToken, error, isSending]);

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel
        mx="auto"
        w={60}
        h={14}
        htmlFor={name}
        cursor={isSending ? "progress" : "pointer"}
        opacity={isSending ? 0.5 : 1}
      >
        {localFileUrl && !isSending ? (
          <Text>Arquivo</Text>
        ) : (
          <Flex
            w="full"
            h="full"
            flexDir="column"
            justifyContent="center"
            alignItems="center"
            borderRadius="md"
            bgColor="gray.100"
            color="gray.500"
            borderWidth={error?.message && 2}
            borderColor={error?.message && "red.500"}
          >
            {isSending ? (
              <>
                <CircularProgress
                  trackColor="gray.200"
                  value={progress}
                  color="orange.500"
                >
                  <CircularProgressLabel>{progress}%</CircularProgressLabel>
                </CircularProgress>
                <Text as="span" pt={2} textAlign="center">
                  Enviando...
                </Text>
              </>
            ) : (
              <Box pos="relative" h="full">
                {!!error && (
                  <Tooltip label={error.message} bg="red.500">
                    <FormErrorMessage
                      pos="absolute"
                      right={2}
                      top={2}
                      mt={0}
                      zIndex="tooltip"
                    >
                      <Icon as={FiAlertCircle} color="red.500" w={4} h={4} />
                    </FormErrorMessage>
                  </Tooltip>
                )}
                <Flex
                  h="full"
                  alignItems="center"
                  justifyContent="center"
                  flexDir="row"
                >
                  <Icon as={FiFile} w={8} h={8} />
                  <Text as="span" pt={2} textAlign="center" fontSize="18">
                    Adicione seu Arquivo
                  </Text>
                </Flex>
              </Box>
            )}
          </Flex>
        )}

        <input
          data-testid={name}
          disabled={isSending}
          id={name}
          onChange={handleFileUpload}
          name={name}
          ref={ref}
          type="file"
          style={{
            display: "none",
          }}
          {...rest}
        />
      </FormLabel>
    </FormControl>
  );
};

export const FileInput = forwardRef(FileInputBase);
