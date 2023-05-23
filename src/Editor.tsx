import type { CreateOnesEditorOptions, OnesEditorUserPermission } from "@ones-editor/editor";
import { useEffect, useMemo, useRef } from "react"
// import { createOnesEditor } from "@ones-editor/editor";


const docId = 'hardorsd';

function useUser() {

  return useMemo(()=> {
    const names = [
      'James',
      'Robert',
      'John',
      'Michael',
      'William',
      'David',
      'Richard',
      'Joseph',
      'Thomas',
      'Charles',
      'Christopher',
      'Daniel',
      'Matthew',
      'Anthony',
      'Mark',
      'Donald',
      'Steven',
      'Paul',
      'Andrew',
      'Joshua',
      'Mary',
      'Patricia',
      'Jennifer',
      'Linda',
      'Elizabeth',
      'Barbara',
      'Susan',
      'Jessica',
      'Sarah',
      'Karen',
      'Nancy',
      'Lisa',
      'Betty',
      'Margaret',
      'Sandra',
      'Ashley',
      'Kimberly',
      'Emily',
      'Donna',
      'Michelle',
    ];
    
    
    const users = names.map((displayName, index) => ({
      userId: displayName,
      displayName,
      avatarUrl: `https://picsum.photos/seed/${displayName.toLocaleLowerCase()}/72/72`,
      rainbowIndex: index,
    }));
  
    return users[Date.now() % users.length];
  }, [])
}

function useAuth(editorRef: React.RefObject<HTMLDivElement>) {
  function getTokenServerUrl() {
    return (window as any).EditorServerUrl || `//${window.location.host}${window.location.pathname}api`;
  }
  
  function getServerUrl() {
    const protocol = window.location.protocol.startsWith('https:') ? 'wss:' : 'ws:';
    return `${protocol}${getTokenServerUrl()}`;
  }
  
  // this code should run on your server
  // eslint-disable-next-line max-len
  async function fakeGetAccessTokenFromServer(appId: string, userId: string, docId: string, permission: OnesEditorUserPermission): Promise<string> {
    const res = await fetch(`${getTokenServerUrl()}/token/${appId}/${docId}/${userId}?permission=${permission}`);
    const ret = await res.json();
    return ret.token;
  }

  const user = useUser();


  async function startEdit() {
    const serverUrl = getServerUrl();
    const appId = '_LC1xOdRp';
    const permission = 'w';
    //  
    const token = await fakeGetAccessTokenFromServer(appId, user.userId, docId, permission);
    const options: CreateOnesEditorOptions = {
      id: 'main-editor',
      serverUrl,
      // lang: 'zh-CN',
      appId,
      docId,
      permission,
      token,
      user,
      enableComments: true,
      components: {},
      componentsOptions: {
        remoteCarets: {
        },
        image: {
          defaultAlign: 'left',
        },
        table: {
          locatingContainer: document.querySelector('.editor-main')!,
        },
        media: {
          allowedMedias: {
            video: ['ogg', 'mp4'],
            audio: ['wav', 'mp3', 'aac', 'ogg', 'webm', 'flac'],
          },
          callbacks: {
            onError(e, main) {
              console.log(e, main.code);
            },
          },
        },
        webpage: {
          helpLink: 'https://guide.ones.pro/wiki/#/team/LBrdb4wE/space/6XDAYB1a/page/PqwmrTgs',
        },
        quickMenu: {
          id: 'quick-menu',
          trigger: ['/'],
          commandProviders: [],
        },
      },
    };
    // const editor = await createOnesEditor(editorRef.current!, options);

    // (window as any).editor = editor
    // return editor
  }

  useEffect(() => {
    startEdit()
  }, [])
}


export default function EditorContainer() {

  const editorRef = useRef<HTMLDivElement>(null)
  useAuth(editorRef)


  return <div ref={editorRef} />
}