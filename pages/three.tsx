import { useRef } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import Link from "next/link"

const Thing = () => {
    const ref = useRef();
    useFrame(() => (
                      ref.current.rotation.x += 0.01,
                      ref.current.rotation.y += 0.01,
                      ref.current.rotation.z += 0.01
                   ));
    return (
        <mesh
            ref={ref}
            onClick={e => console.log('click')}
            onPointerOver={e => console.log('hover')}
            onPointerOut={e => console.log('unhover')}
        >
            <planeBufferGeometry attach='geometry' args={[2, 2]} />
            <meshBasicMaterial
                attach='material'
                color='hotpink'
                opacity={.5}
                transparent
            />
        </mesh>
    );
};

const App = () => {
    return (
      <>
        <div className="three">
          <Canvas>
              <Thing />
          </Canvas>
        </div>
        <div className="btn-form grid">
          <a
            href="https://qiita.com/hppRC/items/b3e292e210d02005120f"
            target="_blank"
            rel="noreferrer noopener"
          >
            LINK
          </a>
          <Link href="/">back</Link>
        </div>
      </>
    );
};

export default App;