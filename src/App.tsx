import { CopyIcon, CheckCircleIcon, WarningIcon } from '@chakra-ui/icons';
import {
  Button,
  Code,
  Input,
  Table,
  TableCaption,
  Tag,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Stack,
  useClipboard,
  Flex,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';

const truncate = (str: string, chars = 10) =>
  str.substr(0, chars) + '...' + str.substr(str.length - chars, chars);

type Host = {
  url: URL;
  domain: string;
};

type Node = {
  index: number;
  httpEndpoint: string;
  wsEndpoint: string;
  address: string;
};

type Nodes = { [key: string]: Node[] };

type ResponseAddress = {
  nativeAddress: string;
  hoprAddress: string;
};

const EndpointButton = ({
  endpoint,
  variant = 'solid',
  label,
}: {
  endpoint: string;
  variant?: string;
  label: string;
}) => {
  const { hasCopied, onCopy } = useClipboard(endpoint);
  return (
    <Button
      onClick={onCopy}
      leftIcon={<CopyIcon />}
      colorScheme="teal"
      variant={variant}
    >
      {hasCopied ? `Copied ${label}` : label}
    </Button>
  );
};

const Hosts = ({
  host,
  nodes,
  domain,
}: {
  host: string;
  nodes: Nodes;
  domain: string;
}) => (
  <Table key={host}>
    <Thead>
      <Tr>
        <Th colSpan={3}>{host}</Th>
      </Tr>
    </Thead>
    <Tbody>
      {nodes[host] &&
        nodes[host].map((node) => (
          <Tr key={node.address}>
            <Td>
              <Flex alignItems="center">
                {node.address ? <CheckCircleIcon /> : <WarningIcon />}{' '}
                <Text mx="2">Host</Text>
                {node.index + 1}
              </Flex>
            </Td>
            <Td>
              <Stack direction="row" spacing={4}>
                <EndpointButton endpoint={node.wsEndpoint} label="WS" />
                <EndpointButton
                  endpoint={node.httpEndpoint}
                  label="HTTP"
                  variant="outline"
                />
              </Stack>
            </Td>
            <Td>
              <Code>
                {node.address ? truncate(node.address) : 'No address'}
              </Code>
            </Td>
            <Td>
              <Tag colorScheme="yellow">{domain}</Tag>
            </Td>
          </Tr>
        ))}
    </Tbody>
  </Table>
);

function App() {
  const [host, setHost] = useState('');
  const [hosts, setHosts] = useState<{ [key: string]: Host }>({});
  const [nodes, setNodes] = useState<Nodes>({});

  const getHeaders = (securityToken: string, isPost = false) => {
    const headers = new Headers();
    if (isPost) {
      headers.set('Content-Type', 'application/json');
      headers.set('Accept-Content', 'application/json');
    }
    headers.set('Authorization', 'Basic ' + btoa(securityToken));
    return headers;
  };

  const loadGitpodHosts = async (gitpodURL: URL) => {
    const NODES = 5;
    const DEFAULT_SECURITY_TOKEN = '^^LOCAL-testing-123^^';
    const BASE_HTTP = (index: number) =>
      `https://1330${index}-${gitpodURL.hostname}`;
    const BASE_WS = (index: number) =>
      `wss://1950${index}-${gitpodURL.hostname}`;

    return await Promise.all(
      [...Array(NODES)].map(async (_, index) => {
        const headers = getHeaders(DEFAULT_SECURITY_TOKEN);
        const address = (
          (await (
            await fetch(`${BASE_HTTP(index + 1)}/api/v2/account/addresses`, {
              headers,
            }).catch((err) => ({
              json: () =>
                Promise.resolve({
                  hoprAddress: '',
                }),
            }))
          ).json()) as ResponseAddress
        ).hoprAddress;
        return {
          index,
          address,
          httpEndpoint: BASE_HTTP(index + 1),
          wsEndpoint: BASE_WS(index + 1),
        };
      })
    );
  };

  useEffect(() => {
    const loadNodesFromHosts = async () => {
      Object.keys(hosts).map(async (host) => {
        switch (hosts[host].domain) {
          case 'gitpod.io':
            const gitpodNodes = await loadGitpodHosts(hosts[host].url);
            setNodes((prevNodes) => ({ [host]: gitpodNodes, ...prevNodes }));
            break;
        }
      });
    };
    loadNodesFromHosts();
  }, [hosts]);

  const enterNode = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      try {
        const url = new URL(host);
        const domain = url.hostname.split('.').slice(-2).join('.');
        setHosts((prevHosts) => ({ [host]: { url, domain }, ...prevHosts }));
      } catch (err) {}
    }
  };

  const exampleTable = (
    <Hosts
      host={'localhost'}
      nodes={{
        localhost: [
          {
            index: 0,
            httpEndpoint: 'http://localhost:3001',
            wsEndpoint: 'ws//localhost:3000',
            address: '16Uiu2HAmE9b3TSHeF25uJS1Ecf2Js3TutnaSnipdV9otEpxbRN8Q',
          },
        ],
      }}
      domain={'localhost'}
    />
  );

  return (
    <>
      <Table variant="simple">
        <TableCaption>
          list of available hopr nodes{' '}
          <Button size="sm" onClick={() => setHosts({})}>
            clear
          </Button>
        </TableCaption>
        <Tbody>
          {exampleTable}
          <Tr>
            {Object.keys(hosts).map((host) => (
              <Hosts host={host} nodes={nodes} domain={hosts[host].domain} />
            ))}
          </Tr>
        </Tbody>
      </Table>
      <Input
        placeholder="node host e.g. https://hoprnet-hoprnet-j4zbg3yajqp.ws-eu31.gitpod.io/ or localhost"
        value={host}
        onChange={(e) => setHost(e.target.value)}
        onKeyPress={enterNode}
      />
    </>
  );
}

export default App;
