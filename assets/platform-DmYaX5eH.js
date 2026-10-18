var pt=Object.defineProperty;var gt=(i,t,e)=>t in i?pt(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var u=(i,t,e)=>gt(i,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function e(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(o){if(o.ep)return;o.ep=!0;const n=e(o);fetch(o.href,n)}})();function bt(i){const t=i.createTexture(),e=i.createFramebuffer();if(!t||!e)return!1;let r=!1;try{i.bindTexture(i.TEXTURE_2D,t),i.texImage2D(i.TEXTURE_2D,0,i.R32UI,1,1,0,i.RED_INTEGER,i.UNSIGNED_INT,null),i.bindFramebuffer(i.FRAMEBUFFER,e),i.framebufferTexture2D(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,t,0),r=i.checkFramebufferStatus(i.FRAMEBUFFER)===i.FRAMEBUFFER_COMPLETE}finally{i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindTexture(i.TEXTURE_2D,null),i.deleteFramebuffer(e),i.deleteTexture(t)}return r}class W extends Error{constructor(t,e){super(t),this.hint=e,this.name="GLInitError"}}function vt(i,t={}){const e=i.getContext("webgl2",{alpha:t.alpha??!1,antialias:t.antialias??!0,depth:!0,stencil:!1,premultipliedAlpha:!1,preserveDrawingBuffer:!1,powerPreference:"high-performance"});if(!e)throw new W("WebGL2 is not available in this browser.","This demo requires WebGL2. Try a recent Chrome, Edge, Firefox or Safari build.");const r=e.getExtension("EXT_color_buffer_float")!==null,o=e.getExtension("EXT_disjoint_timer_query_webgl2")!==null,n=r?bt(e):!1,s=e.getExtension("WEBGL_debug_renderer_info"),c=s?e.getParameter(s.UNMASKED_RENDERER_WEBGL):e.getParameter(e.RENDERER),a=s?e.getParameter(s.UNMASKED_VENDOR_WEBGL):e.getParameter(e.VENDOR),h={alpha:e.getContextAttributes()?.alpha??!1,colorBufferFloat:r,uintRenderTarget:n,timerQuery:o,maxTextureSize:e.getParameter(e.MAX_TEXTURE_SIZE),maxColorAttachments:e.getParameter(e.MAX_COLOR_ATTACHMENTS),maxVertexTextureUnits:e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),renderer:c,vendor:a};if(!r)throw new W("Float render targets (EXT_color_buffer_float) are required but missing.","The GPU simulation stores agent state in floating point textures. Enable hardware acceleration or use a device that supports this WebGL2 extension.");if(!n)throw new W("Integer render targets (R32UI) are required but missing.","The spatial sort packs (bin, index) into an R32UI texture to keep bitonic passes cheap. This device does not expose an integer-renderable R32UI target.");if(h.maxVertexTextureUnits<3)throw new W("Not enough vertex texture units for instanced rendering.","At least 3 vertex texture image units are required.");return{gl:e,caps:h}}function et(i,t,e){const r=i.createShader(t);if(!r)throw new Error("Failed to create shader");if(i.shaderSource(r,e),i.compileShader(r),!i.getShaderParameter(r,i.COMPILE_STATUS)){const o=i.getShaderInfoLog(r);i.deleteShader(r);const n=t===i.VERTEX_SHADER?"vertex":"fragment";throw new Error(`Shader compile error (${n}):
${o}

${xt(e)}`)}return r}function xt(i){return i.split(`
`).map((t,e)=>`${String(e+1).padStart(3," ")}| ${t}`).join(`
`)}function D(i,t,e,r){const o=et(i,i.VERTEX_SHADER,t),n=et(i,i.FRAGMENT_SHADER,e),s=i.createProgram();if(!s)throw new Error("Failed to create program");if(i.attachShader(s,o),i.attachShader(s,n),r&&r.length>0&&i.transformFeedbackVaryings(s,r,i.INTERLEAVED_ATTRIBS),i.linkProgram(s),i.deleteShader(o),i.deleteShader(n),!i.getProgramParameter(s,i.LINK_STATUS)){const h=i.getProgramInfoLog(s);throw i.deleteProgram(s),new Error(`Program link error:
${h}`)}const c={},a=i.getProgramParameter(s,i.ACTIVE_UNIFORMS);for(let h=0;h<a;h++){const d=i.getActiveUniform(s,h);if(!d)continue;const l=d.name.replace(/\[0\]$/,"");c[l]=i.getUniformLocation(s,l)}return{program:s,uniforms:c}}function B(i,t,e,r=null){const o=i.createTexture();if(!o)throw new Error("Failed to create texture");return i.bindTexture(i.TEXTURE_2D,o),i.texImage2D(i.TEXTURE_2D,0,i.RGBA32F,t,e,0,i.RGBA,i.FLOAT,r),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MAG_FILTER,i.NEAREST),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),i.bindTexture(i.TEXTURE_2D,null),o}function it(i,t,e){const r=i.createTexture();if(!r)throw new Error("Failed to create texture");return i.bindTexture(i.TEXTURE_2D,r),i.texImage2D(i.TEXTURE_2D,0,i.R32UI,t,e,0,i.RED_INTEGER,i.UNSIGNED_INT,null),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MAG_FILTER,i.NEAREST),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),i.bindTexture(i.TEXTURE_2D,null),r}function k(i,t){const e=i.createFramebuffer();if(!e)throw new Error("Failed to create framebuffer");i.bindFramebuffer(i.FRAMEBUFFER,e);const r=[];for(let n=0;n<t.length;n++){const s=i.COLOR_ATTACHMENT0+n;i.framebufferTexture2D(i.FRAMEBUFFER,s,i.TEXTURE_2D,t[n],0),r.push(s)}t.length>1&&i.drawBuffers(r);const o=i.checkFramebufferStatus(i.FRAMEBUFFER);if(i.bindFramebuffer(i.FRAMEBUFFER,null),o!==i.FRAMEBUFFER_COMPLETE)throw new Error(`Framebuffer incomplete: 0x${o.toString(16)}`);return e}class yt{constructor(t){u(this,"vao");u(this,"vbo");this.gl=t;const e=new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),r=t.createVertexArray(),o=t.createBuffer();if(!r||!o)throw new Error("Failed to allocate quad buffers");t.bindVertexArray(r),t.bindBuffer(t.ARRAY_BUFFER,o),t.bufferData(t.ARRAY_BUFFER,e,t.STATIC_DRAW),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,2,t.FLOAT,!1,0,0),t.bindVertexArray(null),t.bindBuffer(t.ARRAY_BUFFER,null),this.vao=r,this.vbo=o}draw(){const t=this.gl;t.bindVertexArray(this.vao),t.drawArrays(t.TRIANGLES,0,6)}dispose(){this.gl.deleteBuffer(this.vbo),this.gl.deleteVertexArray(this.vao)}}class K{constructor(t,e){u(this,"gl");u(this,"ext");u(this,"pending",null);u(this,"active",!1);u(this,"available",!1);u(this,"lastMs",0);this.gl=t;const r=e??!0;this.ext=r?t.getExtension("EXT_disjoint_timer_query_webgl2"):null,this.available=this.ext!==null}get supported(){return this.available}begin(){if(!this.available||this.pending)return;const t=this.gl.createQuery();t&&(this.gl.beginQuery(this.ext.TIME_ELAPSED_EXT,t),this.pending=t,this.active=!0)}end(){!this.available||!this.active||(this.gl.endQuery(this.ext.TIME_ELAPSED_EXT),this.active=!1)}poll(){if(!this.available||!this.pending)return this.lastMs;const t=this.gl,e=t.getParameter(this.ext.GPU_DISJOINT_EXT);if(t.getQueryParameter(this.pending,t.QUERY_RESULT_AVAILABLE)&&!e){const o=t.getQueryParameter(this.pending,t.QUERY_RESULT);this.lastMs=o/1e6,t.deleteQuery(this.pending),this.pending=null}else e&&(t.deleteQuery(this.pending),this.pending=null);return this.lastMs}dispose(){this.pending&&(this.gl.deleteQuery(this.pending),this.pending=null),this.active=!1}}function Tt(i,t){const e=t*Math.cos(i),r=t*.78*Math.sin(i)*Math.cos(i),o=t*.52*Math.sin(i);return[e,r,o]}function Et(i,t=2.2){const e=i*10,r=new Float32Array(e*3);for(let l=0;l<e;l++){const f=l/e*Math.PI*2,[m,g,b]=Tt(f,t);r[l*3+0]=m,r[l*3+1]=g,r[l*3+2]=b}const o=new Float32Array(e+1);for(let l=1;l<=e;l++){const f=(l-1)*3,m=l%e*3,g=r[m+0]-r[f+0],b=r[m+1]-r[f+1],v=r[m+2]-r[f+2];o[l]=o[l-1]+Math.hypot(g,b,v)}const n=o[e],s=new Float32Array(i*4),c=new Float32Array(i*3);let a=0;for(let l=0;l<i;l++){const f=l/i*n;for(;a<e-1&&o[a+1]<f;)a++;const m=o[a+1]-o[a]||1e-6,g=(f-o[a])/m,b=a%e*3,v=(a+1)%e*3,y=r[b+0]+(r[v+0]-r[b+0])*g,S=r[b+1]+(r[v+1]-r[b+1])*g,A=r[b+2]+(r[v+2]-r[b+2])*g;s[l*4+0]=y,s[l*4+1]=S,s[l*4+2]=A,s[l*4+3]=0,c[l*3+0]=y,c[l*3+1]=S,c[l*3+2]=A}const h=new Float32Array(i*4),d=n/i;for(let l=0;l<i;l++){const f=(l-1+i)%i,m=(l+1)%i;let g=c[m*3+0]-c[f*3+0],b=c[m*3+1]-c[f*3+1],v=c[m*3+2]-c[f*3+2];const y=Math.hypot(g,b,v)||1e-6;g/=y,b/=y,v/=y;const S=c[m*3+0]-2*c[l*3+0]+c[f*3+0],A=c[m*3+1]-2*c[l*3+1]+c[f*3+1],w=c[m*3+2]-2*c[l*3+2]+c[f*3+2],F=Math.hypot(S,A,w)/(d*d);h[l*4+0]=g,h[l*4+1]=b,h[l*4+2]=v,h[l*4+3]=F}return{sampleCount:i,length:n,positions:s,tangents:h}}function Pt(i,t){const e=i.sampleCount,r=(t%1+1)%1*e,o=Math.floor(r)%e,n=(o+1)%e,s=r-Math.floor(r),c=i.positions,a=i.tangents,h=[c[o*4+0]+(c[n*4+0]-c[o*4+0])*s,c[o*4+1]+(c[n*4+1]-c[o*4+1])*s,c[o*4+2]+(c[n*4+2]-c[o*4+2])*s],d=[a[o*4+0]+(a[n*4+0]-a[o*4+0])*s,a[o*4+1]+(a[n*4+1]-a[o*4+1])*s,a[o*4+2]+(a[n*4+2]-a[o*4+2])*s],l=Math.hypot(d[0],d[1],d[2])||1e-6;return d[0]/=l,d[1]/=l,d[2]/=l,{position:h,tangent:d}}function St(i,t){const e=B(i,t.sampleCount,1,t.positions),r=B(i,t.sampleCount,1,t.tangents);return{posTex:e,tanTex:r,sampleCount:t.sampleCount}}const N=`#version 300 es
precision highp float;
layout(location = 0) in vec2 aPos;
out vec2 vUV;
void main() {
  vUV = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`,O=`#version 300 es
precision highp float;
precision highp int;
precision highp sampler2D;
precision highp usampler2D;
`,At=`${O}
uniform sampler2D uPos;
uniform int uArrayW;
uniform int uCount;
uniform int uBins;
uniform int uIndexBits;

out uint outColor;

void main() {
  int x = int(gl_FragCoord.x);
  int y = int(gl_FragCoord.y);
  int index = y * uArrayW + x;
  uint stride = 1u << uint(uIndexBits);
  if (index >= uCount) {
    outColor = uint(uBins) * stride + uint(index);
    return;
  }
  vec4 p = texelFetch(uPos, ivec2(x, y), 0);
  float s = p.w;
  uint bin = uint(clamp(floor(s * float(uBins)), 0.0, float(uBins - 1)));
  outColor = bin * stride + uint(index);
}
`,wt=`${O}
uniform usampler2D uData;
uniform int uArrayW;
uniform int uArraySize;
uniform int uStage;
uniform int uSub;

out uint outColor;

ivec2 coordOf(int i) {
  return ivec2(i % uArrayW, i / uArrayW);
}

void main() {
  int i = int(gl_FragCoord.y) * uArrayW + int(gl_FragCoord.x);
  if (i >= uArraySize) {
    outColor = 0xFFFFFFFFu;
    return;
  }
  int partner = i ^ uSub;
  uint ka = texelFetch(uData, coordOf(i), 0).x;
  uint kb = texelFetch(uData, coordOf(partner), 0).x;

  bool iIsLow = (i & uSub) == 0;
  bool ascending = (i & uStage) == 0;
  bool wantMin = (ascending == iIsLow);
  bool takeA = wantMin ? (ka <= kb) : (ka >= kb);
  outColor = takeA ? ka : kb;
}
`,Ft=`${O}
uniform usampler2D uSort;
uniform sampler2D uPos;
uniform sampler2D uVel;
uniform int uArrayW;
uniform int uIndexBits;

layout(location = 0) out vec4 outPos;
layout(location = 1) out vec4 outVel;

ivec2 coordOf(int i) {
  return ivec2(i % uArrayW, i / uArrayW);
}

void main() {
  ivec2 c = ivec2(gl_FragCoord.xy);
  uint packed = texelFetch(uSort, c, 0).x;
  int src = int(packed & ((1u << uint(uIndexBits)) - 1u));
  vec4 p = texelFetch(uPos, coordOf(src), 0);
  vec4 v = texelFetch(uVel, coordOf(src), 0);
  outPos = vec4(p.xyz, float(src));
  outVel = v;
}
`,Rt=`${O}
uniform usampler2D uSort;
uniform int uArrayW;
uniform int uArraySize;
uniform int uBins;
uniform int uIndexBits;

out vec4 outColor;

float keyAt(int i) {
  uint packed = texelFetch(uSort, ivec2(i % uArrayW, i / uArrayW), 0).x;
  return float(packed >> uint(uIndexBits));
}

int lowerBound(float target) {
  int lo = 0;
  int hi = uArraySize;
  while (lo < hi) {
    int mid = (lo + hi) >> 1;
    if (keyAt(mid) < target) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

int upperBound(float target) {
  int lo = 0;
  int hi = uArraySize;
  while (lo < hi) {
    int mid = (lo + hi) >> 1;
    if (keyAt(mid) <= target) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

void main() {
  int bin = int(gl_FragCoord.x);
  if (bin >= uBins) {
    outColor = vec4(0.0);
    return;
  }
  float target = float(bin);
  int start = lowerBound(target);
  int end = upperBound(target);
  outColor = vec4(float(start), float(max(end - start, 0)), 0.0, 0.0);
}
`,Ct=`${O}
uniform sampler2D uPos;
uniform sampler2D uVel;
uniform sampler2D uSortedPos;
uniform sampler2D uSortedVel;
uniform sampler2D uOffsets;
uniform sampler2D uPathPos;
uniform sampler2D uPathTan;

uniform int uArrayW;
uniform int uCount;
uniform int uBins;
uniform int uPathSamples;
uniform int uNeighborBins;
uniform int uPerBinCap;
uniform int uMaxNeighbors;

uniform float uDt;
uniform float uTime;
uniform float uPathLength;
uniform float uNeighborRadius;
uniform float uSeparationRadius;
uniform float uMaxSpeed;
uniform float uMinSpeed;
uniform float uMaxForce;
uniform float uDesiredSpeed;
uniform float uPathStrength;
uniform float uPathRadius;
uniform float uSeparationWeight;
uniform float uAlignmentWeight;
uniform float uCohesionWeight;
uniform float uFlowStrength;
uniform float uRadialDamping;
uniform float uNoiseStrength;
uniform float uProgression;

layout(location = 0) out vec4 outPos;
layout(location = 1) out vec4 outVel;

ivec2 coordOf(int i) {
  return ivec2(i % uArrayW, i / uArrayW);
}

float hash1(float n) {
  return fract(sin(n) * 43758.5453123);
}

vec3 hash3(float n) {
  return vec3(hash1(n), hash1(n + 12.9898), hash1(n + 78.233)) * 2.0 - 1.0;
}

void main() {
  int index = int(gl_FragCoord.y) * uArrayW + int(gl_FragCoord.x);
  if (index >= uCount) {
    outPos = vec4(0.0);
    outVel = vec4(0.0);
    return;
  }

  vec4 posData = texelFetch(uPos, coordOf(index), 0);
  vec4 velData = texelFetch(uVel, coordOf(index), 0);
  vec3 pos = posData.xyz;
  vec3 vel = velData.xyz;
  float s = posData.w;
  float seed = velData.w;

  vec3 separation = vec3(0.0);
  vec3 alignSum = vec3(0.0);
  vec3 cohesionSum = vec3(0.0);
  int neighbors = 0;

  float sepR2 = uSeparationRadius * uSeparationRadius;
  float neighR2 = uNeighborRadius * uNeighborRadius;
  int centerBin = int(clamp(floor(s * float(uBins)), 0.0, float(uBins - 1)));

  for (int ring = 0; ring <= uNeighborBins; ring++) {
    if (neighbors >= uMaxNeighbors) break;
    for (int side = 0; side < 2; side++) {
      if (ring == 0 && side == 1) continue;
      if (neighbors >= uMaxNeighbors) break;
      int delta = (side == 0) ? ring : -ring;
      int bin = centerBin + delta;
      bin = ((bin % uBins) + uBins) % uBins;
      vec4 off = texelFetch(uOffsets, ivec2(bin, 0), 0);
      int start = int(off.x);
      int count = int(off.y);
      if (count > uPerBinCap) count = uPerBinCap;
      for (int k = 0; k < count; k++) {
        if (neighbors >= uMaxNeighbors) break;
        vec4 sp = texelFetch(uSortedPos, coordOf(start + k), 0);
        int other = int(sp.w + 0.5);
        if (other == index || other >= uCount) continue;
        vec3 d = sp.xyz - pos;
        float dist2 = dot(d, d);
        if (dist2 > neighR2) continue;
        vec4 ov = texelFetch(uSortedVel, coordOf(start + k), 0);
        neighbors++;
        if (dist2 < sepR2 && dist2 > 1e-8) {
          separation -= d / dist2;
        }
        alignSum += ov.xyz;
        cohesionSum += sp.xyz;
      }
    }
  }

  int pi = int(clamp(floor(s * float(uPathSamples)), 0.0, float(uPathSamples - 1)));
  vec3 pathPoint = texelFetch(uPathPos, ivec2(pi, 0), 0).xyz;
  vec3 pathTangent = texelFetch(uPathTan, ivec2(pi, 0), 0).xyz;
  pathTangent = normalize(pathTangent + vec3(1e-9));

  vec3 accel = vec3(0.0);

  if (neighbors > 0) {
    float inv = 1.0 / float(neighbors);
    vec3 alignDir = alignSum * inv;
    vec3 centerDir = cohesionSum * inv - pos;
    if (dot(alignDir, alignDir) > 1e-8) {
      vec3 desired = normalize(alignDir) * uMaxSpeed;
      accel += (desired - vel) * uAlignmentWeight;
    }
    if (dot(centerDir, centerDir) > 1e-8) {
      vec3 desired = normalize(centerDir) * uMaxSpeed;
      accel += (desired - vel) * uCohesionWeight;
    }
    if (dot(separation, separation) > 1e-8) {
      vec3 desired = normalize(separation) * uMaxSpeed;
      accel += (desired - vel) * uSeparationWeight;
    }
  }

  vec3 toPath = pathPoint - pos;
  float distToPath = length(toPath);
  vec3 outward = toPath / max(distToPath, 1e-5);
  float pull = clamp(distToPath / max(uPathRadius, 1e-4), 0.0, 1.0);
  vec3 attract = outward * pull * uPathStrength;

  vec3 correction = vec3(0.0);
  if (distToPath > uPathRadius) {
    correction = outward * (distToPath - uPathRadius) * uPathStrength * 0.5;
  }

  vec3 tangentVel = pathTangent * dot(vel, pathTangent);
  vec3 radialVel = vel - tangentVel;
  vec3 flow = (pathTangent * uDesiredSpeed - tangentVel) * uFlowStrength;
  vec3 damping = -radialVel * uRadialDamping;

  vec3 noise = hash3(seed + uTime * 0.137 + float(index) * 0.017) * uNoiseStrength;

  accel += attract + correction + flow + damping + noise;

  float accelLen = length(accel);
  if (accelLen > uMaxForce) accel *= uMaxForce / accelLen;

  vec3 newVel = vel + accel * uDt;
  float speed = length(newVel);
  if (speed > uMaxSpeed) newVel *= uMaxSpeed / speed;
  if (speed > 1e-6 && speed < uMinSpeed) newVel *= uMinSpeed / speed;

  vec3 newPos = pos + newVel * uDt;
  float advance = dot(newVel, pathTangent) * uProgression * uDt / max(uPathLength, 1e-4);
  float newS = fract(s + advance);

  outPos = vec4(newPos, newS);
  outVel = vec4(newVel, seed);
}
`;function rt(i){let t=1;for(;t<i;)t<<=1;return t}function Mt(i){let t=0;for(;1<<t<i;)t++;return t}class ot{constructor(t,e,r,o,n){u(this,"arrays");u(this,"gl");u(this,"quad");u(this,"params");u(this,"path");u(this,"pathTex");u(this,"binProgram");u(this,"bitonicProgram");u(this,"offsetsProgram");u(this,"gatherProgram");u(this,"boidsProgram");u(this,"posTex");u(this,"velTex");u(this,"simFbo");u(this,"sortTex");u(this,"sortFbo");u(this,"offsetsTex");u(this,"offsetsFbo");u(this,"sortedPosTex");u(this,"sortedVelTex");u(this,"sortedFbo");u(this,"simIndex",0);u(this,"sortIndex",0);u(this,"frame",0);u(this,"needsSort",!0);u(this,"sortTimer");u(this,"stepTimer");u(this,"stages",[]);this.gl=t,this.quad=e,this.params=r,this.path=o,this.pathTex=n;const s=rt(Math.max(1,Math.ceil(Math.sqrt(r.count)))),c=rt(Math.max(1,Math.ceil(r.count/s)));this.arrays={arrayW:s,arrayH:c,arraySize:s*c,indexBits:Mt(s*c)},this.binProgram=D(t,N,At),this.bitonicProgram=D(t,N,wt),this.offsetsProgram=D(t,N,Rt),this.gatherProgram=D(t,N,Ft),this.boidsProgram=D(t,N,Ct);const{arrayW:a,arrayH:h,arraySize:d}=this.arrays,{posData:l,velData:f}=this.buildInitialState(d,r),m=B(t,a,h,l),g=B(t,a,h,f),b=B(t,a,h,null),v=B(t,a,h,null);this.posTex=[m,b],this.velTex=[g,v],this.simFbo=[k(t,[m,g]),k(t,[b,v])];const y=it(t,a,h),S=it(t,a,h);this.sortTex=[y,S],this.sortFbo=[k(t,[y]),k(t,[S])],this.offsetsTex=B(t,r.bins,1,null),this.offsetsFbo=k(t,[this.offsetsTex]),this.sortedPosTex=B(t,a,h,null),this.sortedVelTex=B(t,a,h,null),this.sortedFbo=k(t,[this.sortedPosTex,this.sortedVelTex]),this.sortTimer=new K(t),this.stepTimer=new K(t),this.buildSortStages(d)}buildInitialState(t,e){const r=new Float32Array(t*4),o=new Float32Array(t*4),n=e.count,s=this.path;for(let c=0;c<n;c++){const a=Math.random(),h=Pt(s,a),d=h.tangent;let l=0,f=1,m=0;Math.abs(d[1])>.9&&(l=1,f=0,m=0);let g=d[1]*m-d[2]*f,b=d[2]*l-d[0]*m,v=d[0]*f-d[1]*l,y=Math.hypot(g,b,v)||1;g/=y,b/=y,v/=y;const S=d[1]*v-d[2]*b,A=d[2]*g-d[0]*v,w=d[0]*b-d[1]*g,F=Math.random()*Math.PI*2,_=Math.sqrt(Math.random())*e.pathRadius*.7,R=Math.cos(F)*_,M=Math.sin(F)*_;r[c*4+0]=h.position[0]+g*R+S*M,r[c*4+1]=h.position[1]+b*R+A*M,r[c*4+2]=h.position[2]+v*R+w*M,r[c*4+3]=a;const p=e.desiredSpeed*(.7+Math.random()*.6);o[c*4+0]=d[0]*p+(Math.random()-.5)*.2,o[c*4+1]=d[1]*p+(Math.random()-.5)*.2,o[c*4+2]=d[2]*p+(Math.random()-.5)*.2,o[c*4+3]=Math.random()*1e3}return{posData:r,velData:o}}buildSortStages(t){this.stages.length=0;for(let e=2;e<=t;e<<=1)for(let r=e>>1;r>0;r>>=1)this.stages.push([e,r])}bindTexture(t,e,r){const o=this.gl;o.activeTexture(o.TEXTURE0+t),o.bindTexture(o.TEXTURE_2D,e),o.uniform1i(r,t)}drawTo(t,e,r){const o=this.gl;o.bindFramebuffer(o.FRAMEBUFFER,t),o.viewport(0,0,e,r),this.quad.draw()}runBinPass(){const t=this.gl,e=this.binProgram;t.useProgram(e.program),this.bindTexture(0,this.posTex[this.simIndex],e.uniforms.uPos),t.uniform1i(e.uniforms.uArrayW,this.arrays.arrayW),t.uniform1i(e.uniforms.uCount,this.params.count),t.uniform1i(e.uniforms.uBins,this.params.bins),t.uniform1i(e.uniforms.uIndexBits,this.arrays.indexBits),t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.CULL_FACE),this.drawTo(this.sortFbo[0],this.arrays.arrayW,this.arrays.arrayH),this.sortIndex=0}runBitonicSort(){const t=this.gl,e=this.bitonicProgram;t.useProgram(e.program),t.uniform1i(e.uniforms.uArrayW,this.arrays.arrayW),t.uniform1i(e.uniforms.uArraySize,this.arrays.arraySize),t.uniform1i(e.uniforms.uData,0);for(const[r,o]of this.stages){t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,this.sortTex[this.sortIndex]),t.uniform1i(e.uniforms.uStage,r),t.uniform1i(e.uniforms.uSub,o);const n=1-this.sortIndex;this.drawTo(this.sortFbo[n],this.arrays.arrayW,this.arrays.arrayH),this.sortIndex=n}}runOffsetsPass(){const t=this.gl,e=this.offsetsProgram;t.useProgram(e.program),this.bindTexture(0,this.sortTex[this.sortIndex],e.uniforms.uSort),t.uniform1i(e.uniforms.uArrayW,this.arrays.arrayW),t.uniform1i(e.uniforms.uArraySize,this.arrays.arraySize),t.uniform1i(e.uniforms.uBins,this.params.bins),t.uniform1i(e.uniforms.uIndexBits,this.arrays.indexBits),this.drawTo(this.offsetsFbo,this.params.bins,1)}neighborBins(){const t=this.params;if(t.neighborBins>0)return Math.max(1,Math.round(t.neighborBins));const e=this.path.length/Math.max(1,t.bins);return Math.max(1,Math.ceil(t.neighborRadius/e))}runGatherPass(){const t=this.gl,e=this.gatherProgram;t.useProgram(e.program),this.bindTexture(0,this.sortTex[this.sortIndex],e.uniforms.uSort),this.bindTexture(1,this.posTex[this.simIndex],e.uniforms.uPos),this.bindTexture(2,this.velTex[this.simIndex],e.uniforms.uVel),t.uniform1i(e.uniforms.uArrayW,this.arrays.arrayW),t.uniform1i(e.uniforms.uIndexBits,this.arrays.indexBits),t.disable(t.BLEND),t.disable(t.DEPTH_TEST),this.drawTo(this.sortedFbo,this.arrays.arrayW,this.arrays.arrayH)}runBoidsPass(t,e){const r=this.gl,o=this.boidsProgram,n=this.params,{arrayW:s,arrayH:c}=this.arrays,a=this.simIndex,h=1-this.simIndex;r.useProgram(o.program),this.bindTexture(0,this.posTex[a],o.uniforms.uPos),this.bindTexture(1,this.velTex[a],o.uniforms.uVel),this.bindTexture(2,this.sortedPosTex,o.uniforms.uSortedPos),this.bindTexture(3,this.sortedVelTex,o.uniforms.uSortedVel),this.bindTexture(4,this.offsetsTex,o.uniforms.uOffsets),this.bindTexture(5,this.pathTex.posTex,o.uniforms.uPathPos),this.bindTexture(6,this.pathTex.tanTex,o.uniforms.uPathTan),r.uniform1i(o.uniforms.uArrayW,s),r.uniform1i(o.uniforms.uCount,n.count),r.uniform1i(o.uniforms.uBins,n.bins),r.uniform1i(o.uniforms.uPathSamples,this.pathTex.sampleCount),r.uniform1i(o.uniforms.uNeighborBins,this.neighborBins()),r.uniform1i(o.uniforms.uPerBinCap,n.perBinCap),r.uniform1i(o.uniforms.uMaxNeighbors,n.maxNeighbors),r.uniform1f(o.uniforms.uDt,t),r.uniform1f(o.uniforms.uTime,e),r.uniform1f(o.uniforms.uPathLength,this.path.length),r.uniform1f(o.uniforms.uNeighborRadius,n.neighborRadius),r.uniform1f(o.uniforms.uSeparationRadius,n.separationRadius),r.uniform1f(o.uniforms.uMaxSpeed,n.maxSpeed),r.uniform1f(o.uniforms.uMinSpeed,n.minSpeed),r.uniform1f(o.uniforms.uMaxForce,n.maxForce),r.uniform1f(o.uniforms.uDesiredSpeed,n.desiredSpeed),r.uniform1f(o.uniforms.uPathStrength,n.pathStrength),r.uniform1f(o.uniforms.uPathRadius,n.pathRadius),r.uniform1f(o.uniforms.uSeparationWeight,n.separationWeight),r.uniform1f(o.uniforms.uAlignmentWeight,n.alignmentWeight),r.uniform1f(o.uniforms.uCohesionWeight,n.cohesionWeight),r.uniform1f(o.uniforms.uFlowStrength,n.flowStrength),r.uniform1f(o.uniforms.uRadialDamping,n.radialDamping),r.uniform1f(o.uniforms.uNoiseStrength,n.noiseStrength),r.uniform1f(o.uniforms.uProgression,n.progression),r.disable(r.BLEND),r.disable(r.DEPTH_TEST),this.drawTo(this.simFbo[h],s,c),this.simIndex=h}step(t,e){const r=Math.max(1,Math.round(this.params.sortInterval));(this.needsSort||this.frame%r===0)&&(this.sortTimer.supported&&this.sortTimer.begin(),this.runBinPass(),this.runBitonicSort(),this.runOffsetsPass(),this.sortTimer.supported&&this.sortTimer.end(),this.needsSort=!1),this.stepTimer.begin(),this.runGatherPass(),this.runBoidsPass(t,e),this.stepTimer.end(),this.frame++}pollSortMs(){return this.sortTimer.poll()}pollStepMs(){return this.stepTimer.poll()}markDirty(){this.needsSort=!0}get positionTexture(){return this.posTex[this.simIndex]}get velocityTexture(){return this.velTex[this.simIndex]}get arrayWidth(){return this.arrays.arrayW}get sortPassCount(){return this.stages.length}dispose(){const t=this.gl;t.deleteTexture(this.posTex[0]),t.deleteTexture(this.posTex[1]),t.deleteTexture(this.velTex[0]),t.deleteTexture(this.velTex[1]),t.deleteTexture(this.sortTex[0]),t.deleteTexture(this.sortTex[1]),t.deleteTexture(this.offsetsTex),t.deleteTexture(this.sortedPosTex),t.deleteTexture(this.sortedVelTex),t.deleteFramebuffer(this.simFbo[0]),t.deleteFramebuffer(this.simFbo[1]),t.deleteFramebuffer(this.sortFbo[0]),t.deleteFramebuffer(this.sortFbo[1]),t.deleteFramebuffer(this.offsetsFbo),t.deleteFramebuffer(this.sortedFbo),t.deleteProgram(this.binProgram.program),t.deleteProgram(this.bitonicProgram.program),t.deleteProgram(this.offsetsProgram.program),t.deleteProgram(this.gatherProgram.program),t.deleteProgram(this.boidsProgram.program),this.sortTimer.dispose(),this.stepTimer.dispose()}}const _t=`#version 300 es
precision highp float;
uniform sampler2D uPos;
uniform sampler2D uVel;
uniform int uArrayW;
uniform float uScale;

out vec3 oRight;
out vec3 oUp;
out vec3 oFwd;
out vec3 oPos;
out float oSpeed;

void main() {
  int id = gl_VertexID;
  ivec2 c = ivec2(id % uArrayW, id / uArrayW);
  vec4 p = texelFetch(uPos, c, 0);
  vec4 v = texelFetch(uVel, c, 0);
  vec3 pos = p.xyz;
  vec3 vel = v.xyz;
  float speed = length(vel);
  vec3 fwd = speed > 1e-5 ? vel / speed : vec3(0.0, 0.0, 1.0);
  vec3 up = abs(fwd.y) > 0.98 ? vec3(1.0, 0.0, 0.0) : vec3(0.0, 1.0, 0.0);
  vec3 right = normalize(cross(fwd, up));
  vec3 trueUp = cross(right, fwd);
  // Bake the boid scale into the basis so the draw shader needs no uniforms.
  oRight = right * uScale;
  oUp = trueUp * uScale;
  oFwd = fwd * uScale;
  oPos = pos;
  oSpeed = speed;
  gl_Position = vec4(0.0);
}
`,Dt=`#version 300 es
precision highp float;
void main() {}
`,Bt=`#version 300 es
precision highp float;
layout(location = 0) in vec3 aPosition;
layout(location = 1) in vec3 aNormal;
layout(location = 2) in vec3 iRight;
layout(location = 3) in vec3 iUp;
layout(location = 4) in vec3 iFwd;
layout(location = 5) in vec3 iPos;
layout(location = 6) in float iSpeed;

uniform mat4 uViewProj;
uniform float uLocal;

out vec3 vNormal;

void main() {
  vec3 world = iPos + iRight * aPosition.x + iUp * aPosition.y + iFwd * aPosition.z;
  // Lighting model: world-space normals track the boid's orientation, while
  // local-space (mesh) normals keep each facet's shading fixed to the body, so
  // the lighting does not shift as the boid rotates.
  vec3 nrm = uLocal > 0.5
    ? aNormal
    : (iRight * aNormal.x + iUp * aNormal.y + iFwd * aNormal.z);
  vNormal = normalize(nrm);
  gl_Position = uViewProj * vec4(world, 1.0);
}
`,Lt=`#version 300 es
precision highp float;
in vec3 vNormal;

uniform float uLocal;
uniform vec3 uColorX;
uniform vec3 uColorY;
uniform vec3 uColorZ;

out vec4 outColor;

void main() {
  vec3 N = normalize(vNormal);
  // The three axes (X/Y/Z) act as lights; blend their colours by how much the
  // facet normal points along each axis. The axes are world-space or the boid's
  // local axes depending on the lighting model. World shading is two-sided
  // (|normal|); local shading uses signed weights so each side of the boid gets
  // a distinct colour instead of collapsing to one.
  vec3 w = uLocal > 0.5 ? N * 0.5 + 0.5 : abs(N);
  float sum = w.x + w.y + w.z;
  vec3 color = (uColorX * w.x + uColorY * w.y + uColorZ * w.z) / sum;
  outColor = vec4(color, 1.0);
}
`,It=`#version 300 es
precision highp float;
layout(location = 0) in vec3 aPosition;
layout(location = 1) in vec3 aNormal;

uniform mat4 uViewProj;

out vec3 vNormal;
out vec3 vWorld;

void main() {
  vNormal = normalize(aNormal);
  vWorld = aPosition;
  gl_Position = uViewProj * vec4(aPosition, 1.0);
}
`,Nt=`#version 300 es
precision highp float;
in vec3 vNormal;
in vec3 vWorld;

uniform vec3 uCameraPos;
uniform vec3 uColor;
uniform float uTime;

out vec4 outColor;

void main() {
  vec3 N = normalize(vNormal);
  vec3 V = normalize(uCameraPos - vWorld);
  float fres = pow(1.0 - max(dot(N, V), 0.0), 2.0);
  float pulse = 0.82 + 0.18 * sin(uTime * 1.8);
  vec3 color = uColor * (0.3 + 0.85 * fres) * pulse;
  outColor = vec4(color, 0.35 + 0.65 * fres);
}
`,kt=`#version 300 es
precision highp float;
in vec2 vUV;
out vec4 outColor;

uniform mat4 uInvViewProj;
uniform vec3 uCameraPos;

void main() {
  vec4 p = uInvViewProj * vec4(vUV * 2.0 - 1.0, 1.0, 1.0);
  vec3 dir = normalize(p.xyz / p.w - uCameraPos);
  float t = clamp(dir.y * 0.5 + 0.5, 0.0, 1.0);
  vec3 bottom = vec3(0.015, 0.02, 0.04);
  vec3 top = vec3(0.05, 0.085, 0.16);
  vec3 color = mix(bottom, top, t);
  color += vec3(0.05, 0.11, 0.2) * pow(max(dot(dir, normalize(vec3(0.0, 0.22, -1.0))), 0.0), 6.0);
  outColor = vec4(color, 1.0);
}
`,Ut=`#version 300 es
precision highp float;
out vec4 outColor;

uniform float uScale; // device pixels per CSS pixel

const float TILE = 40.0;
const vec3 BG = vec3(0.99215686, 0.94117647, 0.83529412);
const vec3 SHAPE = vec3(0.98823529, 0.90588235, 0.74117647);

float ring(float d, float halfWidth, float aa) {
  return 1.0 - smoothstep(halfWidth - aa, halfWidth + aa, d);
}

float disc(float d, float radius, float aa) {
  return 1.0 - smoothstep(radius - aa, radius + aa, d);
}

void main() {
  vec2 p = gl_FragCoord.xy / uScale; // CSS pixels, origin bottom-left
  vec2 t = mod(p, TILE);
  vec2 c = vec2(TILE * 0.5);
  float aa = 1.5 / uScale;
  float m = abs(t.x - c.x) + abs(t.y - c.y);

  float cov = ring(abs(m - 19.0), 0.75, aa);
  cov = max(cov, ring(abs(m - 9.0), 0.6, aa));
  cov = max(cov, disc(length(t - c), 2.0, aa));
  cov = max(cov, disc(length(t - vec2(0.0, 0.0)), 1.6, aa));
  cov = max(cov, disc(length(t - vec2(TILE, 0.0)), 1.6, aa));
  cov = max(cov, disc(length(t - vec2(0.0, TILE)), 1.6, aa));
  cov = max(cov, disc(length(t - vec2(TILE, TILE)), 1.6, aa));

  outColor = vec4(mix(BG, SHAPE, cov), 1.0);
}
`;function $(i,t,e,r){const o=e[0]-t[0],n=e[1]-t[1],s=e[2]-t[2],c=r[0]-t[0],a=r[1]-t[1],h=r[2]-t[2];let d=n*h-s*a,l=s*c-o*h,f=o*a-n*c;const m=Math.hypot(d,l,f)||1e-6;d/=m,l/=m,f/=m,i.push(t[0],t[1],t[2],d,l,f),i.push(e[0],e[1],e[2],d,l,f),i.push(r[0],r[1],r[2],d,l,f)}function Vt(){const i=[0,0,.62],t=[0,0,-.34],e=.16,r=[[e,0,0],[0,e,0],[-e,0,0],[0,-e,0]],o=[];for(let n=0;n<4;n++){const s=r[n],c=r[(n+1)%4];$(o,i,s,c),$(o,t,c,s)}return{vertices:new Float32Array(o),vertexCount:o.length/6}}function Wt(i,t,e){const r=i.sampleCount,o=i.positions,n=i.tangents;let s=n[0],c=n[1],a=n[2],h=Math.hypot(s,c,a)||1e-6;s/=h,c/=h,a/=h;let d=-c,l=s,f=0,m=Math.hypot(d,l,f);m<1e-4&&(d=1,l=0,f=0,m=1),d/=m,l/=m,f/=m;const g=new Float32Array(r*3),b=new Float32Array(r*3),v=new Float32Array(r*3),y=new Float32Array(e),S=new Float32Array(e);for(let p=0;p<e;p++){const E=p/e*Math.PI*2;y[p]=Math.cos(E),S[p]=Math.sin(E)}for(let p=0;p<r;p++){let E=n[p*4+0],x=n[p*4+1],P=n[p*4+2];const C=Math.hypot(E,x,P)||1e-6;if(E/=C,x/=C,P/=C,p>0){const Y=d*E+l*x+f*P;d-=E*Y,l-=x*Y,f-=P*Y;const z=Math.hypot(d,l,f);if(z<1e-5){d=-x,l=E,f=0;const q=Math.hypot(d,l,f)||1;d/=q,l/=q,f/=q}else d/=z,l/=z,f/=z}const T=x*f-P*l,H=P*d-E*f,j=E*l-x*d;g[p*3+0]=d,g[p*3+1]=l,g[p*3+2]=f,b[p*3+0]=T,b[p*3+1]=H,b[p*3+2]=j,v[p*3+0]=o[p*4+0],v[p*3+1]=o[p*4+1],v[p*3+2]=o[p*4+2]}const A=(p,E,x)=>{const P=y[E],C=S[E],T=v[p*3+0]+t*(g[p*3+0]*P+b[p*3+0]*C),H=v[p*3+1]+t*(g[p*3+1]*P+b[p*3+1]*C),j=v[p*3+2]+t*(g[p*3+2]*P+b[p*3+2]*C);return x[0]=T,x[1]=H,x[2]=j,x},w=[],F=[0,0,0],_=[0,0,0],R=[0,0,0],M=[0,0,0];for(let p=0;p<r;p++){const E=(p+1)%r;for(let x=0;x<e;x++){const P=(x+1)%e;A(p,x,F),A(E,x,_),A(E,P,R),A(p,P,M),$(w,F,_,R),$(w,F,R,M)}}return{vertices:new Float32Array(w),vertexCount:w.length/6}}function L(i=0,t=0,e=0){return new Float32Array([i,t,e])}function Ot(){const i=new Float32Array(16);return i[0]=1,i[5]=1,i[10]=1,i[15]=1,i}function zt(i,t,e,r){const o=1/Math.tan(i/2),n=1/(e-r),s=new Float32Array(16);return s[0]=o/t,s[5]=o,s[10]=(r+e)*n,s[11]=-1,s[14]=2*r*e*n,s}function Xt(i,t,e){let r=i[0]-t[0],o=i[1]-t[1],n=i[2]-t[2],s=Math.hypot(r,o,n);s<1e-6&&(r=0,o=0,n=1,s=1),r/=s,o/=s,n/=s;let c=e[1]*n-e[2]*o,a=e[2]*r-e[0]*n,h=e[0]*o-e[1]*r;s=Math.hypot(c,a,h),s<1e-6&&(c=1,a=0,h=0,s=1),c/=s,a/=s,h/=s;const d=o*h-n*a,l=n*c-r*h,f=r*a-o*c,m=new Float32Array(16);return m[0]=c,m[1]=d,m[2]=r,m[3]=0,m[4]=a,m[5]=l,m[6]=o,m[7]=0,m[8]=h,m[9]=f,m[10]=n,m[11]=0,m[12]=-(c*i[0]+a*i[1]+h*i[2]),m[13]=-(d*i[0]+l*i[1]+f*i[2]),m[14]=-(r*i[0]+o*i[1]+n*i[2]),m[15]=1,m}function Gt(i,t){const e=new Float32Array(16);for(let r=0;r<4;r++){const o=t[r*4+0],n=t[r*4+1],s=t[r*4+2],c=t[r*4+3];e[r*4+0]=i[0]*o+i[4]*n+i[8]*s+i[12]*c,e[r*4+1]=i[1]*o+i[5]*n+i[9]*s+i[13]*c,e[r*4+2]=i[2]*o+i[6]*n+i[10]*s+i[14]*c,e[r*4+3]=i[3]*o+i[7]*n+i[11]*s+i[15]*c}return e}function $t(i){const t=new Float32Array(16),e=i[0],r=i[1],o=i[2],n=i[3],s=i[4],c=i[5],a=i[6],h=i[7],d=i[8],l=i[9],f=i[10],m=i[11],g=i[12],b=i[13],v=i[14],y=i[15],S=e*c-r*s,A=e*a-o*s,w=e*h-n*s,F=r*a-o*c,_=r*h-n*c,R=o*h-n*a,M=d*b-l*g,p=d*v-f*g,E=d*y-m*g,x=l*v-f*b,P=l*y-m*b,C=f*y-m*v;let T=S*C-A*P+w*x+F*E-_*p+R*M;return T?(T=1/T,t[0]=(c*C-a*P+h*x)*T,t[1]=(o*P-r*C-n*x)*T,t[2]=(b*R-v*_+y*F)*T,t[3]=(f*_-l*R-m*F)*T,t[4]=(a*E-s*C-h*p)*T,t[5]=(e*C-o*E+n*p)*T,t[6]=(v*w-g*R-y*A)*T,t[7]=(d*R-f*w+m*A)*T,t[8]=(s*P-c*E+h*M)*T,t[9]=(r*E-e*P-n*M)*T,t[10]=(g*_-b*w+y*S)*T,t[11]=(l*w-d*_-m*S)*T,t[12]=(c*p-s*x-a*M)*T,t[13]=(e*x-r*p+o*M)*T,t[14]=(b*A-g*F-v*S)*T,t[15]=(d*F-l*A+f*S)*T,t):Ot()}function U(i,t,e){return i<t?t:i>e?e:i}const Ht=/^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;function ut(i){const t=Ht.exec(i.trim());if(!t)return null;let e=t[1];return e.length===3&&(e=e[0]+e[0]+e[1]+e[1]+e[2]+e[2]),`#${e.toLowerCase()}`}function Q(i,t=L(0,0,0)){const e=ut(i);if(!e)return L(t[0],t[1],t[2]);const r=parseInt(e.slice(1),16);return L((r>>16&255)/255,(r>>8&255)/255,(r&255)/255)}const jt=13,nt=jt*4;function st(i,t){const e=i.createVertexArray(),r=i.createBuffer();if(!e||!r)throw new Error("Failed to allocate mesh");i.bindVertexArray(e),i.bindBuffer(i.ARRAY_BUFFER,r),i.bufferData(i.ARRAY_BUFFER,t.vertices,i.STATIC_DRAW);const o=6*4;return i.enableVertexAttribArray(0),i.vertexAttribPointer(0,3,i.FLOAT,!1,o,0),i.enableVertexAttribArray(1),i.vertexAttribPointer(1,3,i.FLOAT,!1,o,3*4),i.bindVertexArray(null),i.bindBuffer(i.ARRAY_BUFFER,null),{vao:e,vbo:r,vertexCount:t.vertexCount}}class Yt{constructor(t,e,r,o,n={}){u(this,"gl");u(this,"quad");u(this,"expandProgram");u(this,"boidProgram");u(this,"pathProgram");u(this,"skyProgram");u(this,"patternProgram");u(this,"boidMesh");u(this,"pathMesh");u(this,"background");u(this,"instanceVao");u(this,"instanceBuffer");u(this,"feedback");u(this,"instanceCapacity",0);u(this,"fallbackColor",L(.12,.36,.85));u(this,"pathColor",L(.35,.82,1));u(this,"up",L(0,1,0));this.gl=t,this.quad=e,this.background=n.background??"sky",this.expandProgram=D(t,_t,Dt,["oRight","oUp","oFwd","oPos","oSpeed"]),this.boidProgram=D(t,Bt,Lt),this.pathProgram=D(t,It,Nt),this.skyProgram=D(t,N,kt),this.patternProgram=D(t,N,Ut),this.boidMesh=st(t,Vt()),this.pathMesh=st(t,Wt(r,o.tubeRadius,6));const s=t.createBuffer(),c=t.createTransformFeedback(),a=t.createVertexArray();if(!s||!c||!a)throw new Error("Failed to allocate instancing resources");this.instanceBuffer=s,this.feedback=c,this.instanceVao=a,t.bindVertexArray(a),t.bindBuffer(t.ARRAY_BUFFER,this.boidMesh.vbo),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,3,t.FLOAT,!1,24,0),t.enableVertexAttribArray(1),t.vertexAttribPointer(1,3,t.FLOAT,!1,24,12),t.bindBuffer(t.ARRAY_BUFFER,s);const h=[[2,3,0],[3,3,12],[4,3,24],[5,3,36],[6,1,48]];for(const[d,l,f]of h)t.enableVertexAttribArray(d),t.vertexAttribPointer(d,l,t.FLOAT,!1,nt,f),t.vertexAttribDivisor(d,1);t.bindVertexArray(null),t.bindBuffer(t.ARRAY_BUFFER,null)}ensureInstanceCapacity(t){if(t<=this.instanceCapacity)return;const e=this.gl;e.bindBuffer(e.ARRAY_BUFFER,this.instanceBuffer),e.bufferData(e.ARRAY_BUFFER,t*nt,e.DYNAMIC_DRAW),e.bindBuffer(e.ARRAY_BUFFER,null),this.instanceCapacity=t}expandInstances(t,e){const r=this.gl,o=e.count;this.ensureInstanceCapacity(o),r.useProgram(this.expandProgram.program),r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,t.positionTexture),r.uniform1i(this.expandProgram.uniforms.uPos,0),r.activeTexture(r.TEXTURE1),r.bindTexture(r.TEXTURE_2D,t.velocityTexture),r.uniform1i(this.expandProgram.uniforms.uVel,1),r.uniform1i(this.expandProgram.uniforms.uArrayW,t.arrayWidth),r.uniform1f(this.expandProgram.uniforms.uScale,e.boidScale),r.bindVertexArray(null),r.bindTransformFeedback(r.TRANSFORM_FEEDBACK,this.feedback),r.bindBufferBase(r.TRANSFORM_FEEDBACK_BUFFER,0,this.instanceBuffer),r.enable(r.RASTERIZER_DISCARD),r.beginTransformFeedback(r.POINTS),r.drawArrays(r.POINTS,0,o),r.endTransformFeedback(),r.disable(r.RASTERIZER_DISCARD),r.bindBufferBase(r.TRANSFORM_FEEDBACK_BUFFER,0,null),r.bindTransformFeedback(r.TRANSFORM_FEEDBACK,null)}draw(t,e,r,o,n,s,c=1){const a=this.gl;a.bindFramebuffer(a.FRAMEBUFFER,null),a.viewport(0,0,n,s);const h=n/Math.max(s,1),d=zt(t.fov*Math.PI/180,h,.05,200),l=Xt(t.eye(),t.target,this.up),f=Gt(d,l),m=$t(f),g=t.eye();a.clearColor(.015,.02,.04,this.background==="transparent"?0:1),a.clear(a.COLOR_BUFFER_BIT|a.DEPTH_BUFFER_BIT),(this.background==="sky"||this.background==="pattern")&&(a.disable(a.DEPTH_TEST),a.depthMask(!1),a.disable(a.BLEND),this.background==="sky"?(a.useProgram(this.skyProgram.program),a.uniformMatrix4fv(this.skyProgram.uniforms.uInvViewProj,!1,m),a.uniform3fv(this.skyProgram.uniforms.uCameraPos,g)):(a.useProgram(this.patternProgram.program),a.uniform1f(this.patternProgram.uniforms.uScale,Math.max(c,.001))),this.quad.draw()),this.expandInstances(e,r),a.enable(a.DEPTH_TEST),a.depthFunc(a.LEQUAL),a.depthMask(!0),a.disable(a.BLEND),a.disable(a.CULL_FACE),a.useProgram(this.boidProgram.program),a.uniformMatrix4fv(this.boidProgram.uniforms.uViewProj,!1,f),a.uniform3fv(this.boidProgram.uniforms.uColorX,Q(r.boidColorX,this.fallbackColor)),a.uniform3fv(this.boidProgram.uniforms.uColorY,Q(r.boidColorY,this.fallbackColor)),a.uniform3fv(this.boidProgram.uniforms.uColorZ,Q(r.boidColorZ,this.fallbackColor)),a.uniform1f(this.boidProgram.uniforms.uLocal,r.lighting==="local"?1:0),a.bindVertexArray(this.instanceVao),a.drawArraysInstanced(a.TRIANGLES,0,this.boidMesh.vertexCount,r.count),a.bindVertexArray(null),r.showPath&&(a.enable(a.BLEND),a.blendFunc(a.SRC_ALPHA,a.ONE),a.depthMask(!1),a.useProgram(this.pathProgram.program),a.uniformMatrix4fv(this.pathProgram.uniforms.uViewProj,!1,f),a.uniform3fv(this.pathProgram.uniforms.uCameraPos,g),a.uniform3fv(this.pathProgram.uniforms.uColor,this.pathColor),a.uniform1f(this.pathProgram.uniforms.uTime,o),a.bindVertexArray(this.pathMesh.vao),a.drawArrays(a.TRIANGLES,0,this.pathMesh.vertexCount),a.bindVertexArray(null),a.depthMask(!0),a.disable(a.BLEND))}dispose(){const t=this.gl;t.deleteProgram(this.expandProgram.program),t.deleteProgram(this.boidProgram.program),t.deleteProgram(this.pathProgram.program),t.deleteProgram(this.skyProgram.program),t.deleteProgram(this.patternProgram.program),t.deleteVertexArray(this.boidMesh.vao),t.deleteBuffer(this.boidMesh.vbo),t.deleteVertexArray(this.pathMesh.vao),t.deleteBuffer(this.pathMesh.vbo),t.deleteVertexArray(this.instanceVao),t.deleteBuffer(this.instanceBuffer),t.deleteTransformFeedback(this.feedback)}}class qt{constructor(t,e,r={}){u(this,"gl");u(this,"caps");u(this,"canvas");u(this,"params");u(this,"quad");u(this,"path");u(this,"pathTex");u(this,"renderer");u(this,"renderTimer");u(this,"sim");u(this,"renderW",1);u(this,"renderH",1);u(this,"pixelRatio",1);this.canvas=t,this.params=e;const{gl:o,caps:n}=vt(t,{antialias:r.antialias,alpha:r.transparent});this.gl=o,this.caps=n,this.quad=new yt(o),this.path=Et(e.pathSamples,e.pathScale),this.pathTex=St(o,this.path),this.sim=new ot(o,this.quad,e,this.path,this.pathTex);const s=r.transparent?n.alpha?"transparent":"pattern":"sky";this.renderer=new Yt(o,this.quad,this.path,e,{background:s}),this.renderTimer=new K(o,n.timerQuery),this.resize()}resize(){const t=Math.min(window.devicePixelRatio||1,this.params.dprCap)*this.params.resolutionScale;this.pixelRatio=t;const e=Math.max(1,Math.round(this.canvas.clientWidth*t)),r=Math.max(1,Math.round(this.canvas.clientHeight*t));e===this.renderW&&r===this.renderH||(this.renderW=e,this.renderH=r,this.canvas.width=e,this.canvas.height=r)}rebuild(){this.sim.dispose(),this.sim=new ot(this.gl,this.quad,this.params,this.path,this.pathTex)}reactToChanges(t){t.some(e=>e==="count"||e==="bins")&&this.rebuild(),t.some(e=>e==="dprCap"||e==="resolutionScale")&&this.resize(),t.includes("sortInterval")&&this.sim.markDirty()}step(t,e){this.sim.step(t,e)}draw(t,e){this.renderTimer.begin(),this.renderer.draw(t,this.sim,this.params,e,this.renderW,this.renderH,this.pixelRatio),this.renderTimer.end()}stats(){return{count:this.params.count,arraySize:this.sim.arrays.arraySize,sortPasses:this.sim.sortPassCount,renderer:this.caps.renderer,resolution:`${this.renderW}x${this.renderH}`,sortMs:this.sim.pollSortMs(),stepMs:this.sim.pollStepMs(),drawMs:this.renderTimer.poll()}}dispose(){this.sim.dispose(),this.renderer.dispose(),this.quad.dispose()}}class Qt{constructor(t,e,r,o){u(this,"raf",0);u(this,"last",0);u(this,"simTime",0);u(this,"frame",t=>{this.raf=requestAnimationFrame(this.frame);const e=t/1e3;let r=this.last===0?1/60:e-this.last;this.last=e,r=Math.min(r,.05);const o=performance.now(),n=Math.min(r*this.params.timeScale,1/30);this.simTime+=n,this.camera.autorotate=this.params.autorotate,this.camera.update(r),n>0&&this.scene.step(n,this.simTime),this.scene.draw(this.camera,this.simTime);const s=performance.now()-o;if(this.hud){const c=this.scene.stats();this.hud.tick(r),this.hud.setCpu(s),this.hud.setGpu(c.sortMs,c.stepMs,c.drawMs),this.hud.render({count:c.count,arraySize:c.arraySize,sortPasses:c.sortPasses,renderer:c.renderer,resolution:c.resolution})}});this.scene=t,this.camera=e,this.params=r,this.hud=o}start(){this.last=0,this.raf=requestAnimationFrame(this.frame)}stop(){cancelAnimationFrame(this.raf)}dispose(){this.stop()}}const I={yaw:Math.PI*.25,pitch:.32,distance:9,target:[0,0,0],fov:48};class Kt{constructor(t,e=!0){u(this,"fov",48);u(this,"target",L(0,0,0));u(this,"distance",9);u(this,"yaw",Math.PI*.25);u(this,"pitch",.32);u(this,"minDistance",2.5);u(this,"maxDistance",40);u(this,"minPitch",-1.4);u(this,"maxPitch",1.4);u(this,"autorotate",!0);u(this,"autoSpeed",.12);u(this,"pointers",new Map);u(this,"lastPinch",0);u(this,"dragging",!1);u(this,"onDown",t=>{this.canvas.setPointerCapture(t.pointerId),this.pointers.set(t.pointerId,{x:t.clientX,y:t.clientY}),this.dragging=!0,this.pointers.size===2&&(this.lastPinch=this.pinchDistance())});u(this,"onMove",t=>{const e=this.pointers.get(t.pointerId);if(!e)return;const r=t.clientX-e.x,o=t.clientY-e.y;if(e.x=t.clientX,e.y=t.clientY,this.pointers.size===1)this.yaw-=r*.006,this.pitch=U(this.pitch+o*.006,this.minPitch,this.maxPitch);else if(this.pointers.size===2){const n=this.pinchDistance();if(this.lastPinch>0){const s=this.lastPinch/Math.max(n,1);this.distance=U(this.distance*s,this.minDistance,this.maxDistance)}this.lastPinch=n}});u(this,"onUp",t=>{this.pointers.delete(t.pointerId),this.pointers.size<2&&(this.lastPinch=0),this.pointers.size===0&&(this.dragging=!1)});u(this,"onWheel",t=>{t.preventDefault();const e=Math.exp(t.deltaY*.0012);this.distance=U(this.distance*e,this.minDistance,this.maxDistance)});this.canvas=t,e&&this.attach()}attach(){const t=this.canvas;t.addEventListener("pointerdown",this.onDown),t.addEventListener("pointermove",this.onMove),t.addEventListener("pointerup",this.onUp),t.addEventListener("pointercancel",this.onUp),t.addEventListener("wheel",this.onWheel,{passive:!1}),t.addEventListener("contextmenu",e=>e.preventDefault())}pinchDistance(){const t=[...this.pointers.values()];return t.length<2?0:Math.hypot(t[0].x-t[1].x,t[0].y-t[1].y)}update(t){this.autorotate&&!this.dragging&&(this.yaw+=t*this.autoSpeed)}eye(){const t=Math.cos(this.pitch),e=Math.sin(this.pitch);return L(this.target[0]+this.distance*t*Math.sin(this.yaw),this.target[1]+this.distance*e,this.target[2]+this.distance*t*Math.cos(this.yaw))}getState(){return{yaw:this.yaw,pitch:this.pitch,distance:this.distance,target:[this.target[0],this.target[1],this.target[2]],fov:this.fov}}setState(t){typeof t.yaw=="number"&&Number.isFinite(t.yaw)&&(this.yaw=t.yaw),typeof t.pitch=="number"&&Number.isFinite(t.pitch)&&(this.pitch=U(t.pitch,this.minPitch,this.maxPitch)),typeof t.distance=="number"&&Number.isFinite(t.distance)&&(this.distance=U(t.distance,this.minDistance,this.maxDistance)),typeof t.fov=="number"&&Number.isFinite(t.fov)&&(this.fov=U(t.fov,20,100)),Array.isArray(t.target)&&t.target.length===3&&t.target.every(Number.isFinite)&&(this.target=L(t.target[0],t.target[1],t.target[2]))}reset(){this.setState(I)}dispose(){const t=this.canvas;t.removeEventListener("pointerdown",this.onDown),t.removeEventListener("pointermove",this.onMove),t.removeEventListener("pointerup",this.onUp),t.removeEventListener("pointercancel",this.onUp),t.removeEventListener("wheel",this.onWheel)}}function lt(i){return i.replace(/[&<>"']/g,t=>{switch(t){case"&":return"&amp;";case"<":return"&lt;";case">":return"&gt;";case'"':return"&quot;";default:return"&#39;"}})}function Zt(i,t){return i.length>t?`${i.slice(0,t-1)}…`:i}class Jt{constructor(t){u(this,"frames",0);u(this,"accum",0);u(this,"fps",0);u(this,"frameMs",0);u(this,"cpuMs",0);u(this,"gpuSortMs",0);u(this,"gpuStepMs",0);u(this,"gpuDrawMs",0);this.el=t}setCpu(t){this.cpuMs=t}setGpu(t,e,r){this.gpuSortMs=t,this.gpuStepMs=e,this.gpuDrawMs=r}tick(t){this.frames++,this.accum+=t,this.frameMs=t*1e3,this.accum>=.5&&(this.fps=this.frames/this.accum,this.frames=0,this.accum=0)}render(t){const e=r=>r>0?r.toFixed(2):"n/a";this.el.innerHTML=`<b>${this.fps.toFixed(0)}</b> fps  <b>${this.frameMs.toFixed(1)}</b> ms
cpu <b>${this.cpuMs.toFixed(2)}</b> ms
gpu sort <b>${e(this.gpuSortMs)}</b>  step <b>${e(this.gpuStepMs)}</b>  draw <b>${e(this.gpuDrawMs)}</b>
boids <b>${t.count.toLocaleString()}</b> / ${t.arraySize.toLocaleString()} slots
sort <b>${t.sortPasses}</b> passes
res ${t.resolution}
${lt(Zt(t.renderer,34))}`}}class Z{constructor(t,e){u(this,"onToggle",()=>{this.panel.classList.toggle("collapsed"),this.panel.classList.remove("open"),this.sync()});u(this,"onCollapse",()=>{this.panel.classList.add("collapsed"),this.sync()});this.panel=t,this.toggle=e,t.classList.toggle("collapsed",window.innerWidth<720),this.sync(),e.addEventListener("click",this.onToggle),t.addEventListener("dblclick",this.onCollapse)}static mount(){const t=document.getElementById("panel"),e=document.getElementById("panelToggle");return t&&e?new Z(t,e):null}sync(){this.toggle.classList.toggle("show",this.panel.classList.contains("collapsed"))}dispose(){this.toggle.removeEventListener("click",this.onToggle),this.panel.removeEventListener("dblclick",this.onCollapse)}}const te=[{title:"Agents",controls:[{type:"select",key:"count",label:"count",options:[4096,8192,16384,32768,65536,131072]},{type:"slider",key:"boidScale",label:"size",min:.03,max:.2,step:.005,digits:3},{type:"select",key:"sortInterval",label:"sort every",options:[1,2,3,4,6]}]},{title:"Lighting",controls:[{type:"enum",key:"lighting",label:"model",options:["world","local"]}]},{title:"Shading",controls:[{type:"color",key:"boidColorX",label:"x"},{type:"color",key:"boidColorY",label:"y"},{type:"color",key:"boidColorZ",label:"z"}]},{title:"Ribbon",controls:[{type:"slider",key:"pathStrength",label:"pull",min:0,max:20,step:.1,digits:1},{type:"slider",key:"pathRadius",label:"radius",min:.1,max:1.5,step:.01,digits:2},{type:"slider",key:"flowStrength",label:"flow",min:0,max:6,step:.05,digits:2},{type:"slider",key:"radialDamping",label:"damping",min:0,max:8,step:.05,digits:2},{type:"slider",key:"desiredSpeed",label:"speed",min:.2,max:4,step:.05,digits:2},{type:"slider",key:"maxForce",label:"force",min:1,max:25,step:.5,digits:1},{type:"slider",key:"noiseStrength",label:"jitter",min:0,max:1.5,step:.01,digits:2}]},{title:"Flocking",controls:[{type:"slider",key:"separationWeight",label:"separate",min:0,max:5,step:.05,digits:2},{type:"slider",key:"alignmentWeight",label:"align",min:0,max:5,step:.05,digits:2},{type:"slider",key:"cohesionWeight",label:"cohere",min:0,max:5,step:.05,digits:2},{type:"slider",key:"neighborRadius",label:"range",min:.05,max:1,step:.01,digits:2},{type:"slider",key:"separationRadius",label:"spacing",min:.02,max:.5,step:.005,digits:3}]},{title:"View",controls:[{type:"toggle",key:"autorotate",label:"auto-rotate"},{type:"toggle",key:"showPath",label:"show path"},{type:"slider",key:"timeScale",label:"time",min:0,max:2.5,step:.05,digits:2},{type:"slider",key:"resolutionScale",label:"resolution",min:.5,max:1.5,step:.05,digits:2}]}];function at(i,t){return i.toFixed(t)}function ee(i,t,e){for(const r of te){const o=document.createElement("div");o.className="group";const n=document.createElement("div");n.className="title",n.textContent=r.title,o.appendChild(n);for(const s of r.controls){const c=document.createElement("div");c.className="row";const a=document.createElement("label");if(a.textContent=s.label,c.appendChild(a),s.type==="slider"){const h=document.createElement("input");h.type="range",h.min=String(s.min),h.max=String(s.max),h.step=String(s.step),h.value=String(t[s.key]);const d=document.createElement("span");d.className="val";const l=s.digits??2;d.textContent=at(t[s.key],l),h.addEventListener("input",()=>{const f=Number(h.value);t[s.key]=f,d.textContent=at(f,l),e(s.key)}),c.appendChild(h),c.appendChild(d)}else if(s.type==="toggle"){const h=document.createElement("label");h.className="toggle";const d=document.createElement("input");d.type="checkbox",d.checked=!!t[s.key];const l=document.createTextNode(d.checked?"on":"off");d.addEventListener("change",()=>{t[s.key]=d.checked,l.textContent=d.checked?"on":"off",e(s.key)}),h.appendChild(d),h.appendChild(l),c.appendChild(h)}else if(s.type==="color"){const h=document.createElement("input");h.type="color",h.value=String(t[s.key]),h.addEventListener("input",()=>{t[s.key]=h.value,e(s.key)}),c.appendChild(h)}else if(s.type==="enum"){const h=document.createElement("select");h.style.flex="1 1 auto";const d=String(t[s.key]);for(const l of s.options){const f=document.createElement("option");f.value=l,f.textContent=l,l===d&&(f.selected=!0),h.appendChild(f)}h.addEventListener("change",()=>{t[s.key]=h.value,e(s.key)}),c.appendChild(h)}else{const h=document.createElement("select");h.style.flex="1 1 auto";for(const d of s.options){const l=document.createElement("option");l.value=String(d),l.textContent=d.toLocaleString(),d===t[s.key]&&(l.selected=!0),h.appendChild(l)}h.addEventListener("change",()=>{t[s.key]=Number(h.value),e(s.key)}),c.appendChild(h)}o.appendChild(c)}i.appendChild(o)}}function X(i,t){const e=document.createElement("button");return e.type="button",e.className="action",e.textContent=i,e.addEventListener("click",t),e}function ie(i,t){const e=document.createElement("div");e.className="group";const r=document.createElement("div");r.className="title",r.textContent="Config",e.appendChild(r);const o=document.createElement("div");o.className="actions";const n=document.createElement("input");n.type="file",n.accept="application/json,.json",n.style.display="none",n.addEventListener("change",()=>{const l=n.files?.[0];l&&t.onLoad(l),n.value=""});const s=X("Save",()=>t.onSave()),c=X("Load",()=>n.click()),a=X("Reset",()=>t.onReset()),h=X("Copy",()=>t.onCopy());o.append(s,c,a,h,n),e.appendChild(o);const d=document.createElement("div");return d.className="status",e.appendChild(d),i.appendChild(e),d}function V(i,t,e=!1){if(!i)return;const r=i;r.textContent=t,r.classList.toggle("error",e),r.classList.toggle("ok",!e),r.__statusTimer&&window.clearTimeout(r.__statusTimer),r.__statusTimer=window.setTimeout(()=>{r.textContent="",r.classList.remove("ok","error"),r.__statusTimer=void 0},2600)}const J={count:16384,bins:1024,neighborBins:0,perBinCap:16,maxNeighbors:32,neighborRadius:.34,separationRadius:.15,maxSpeed:2.2,minSpeed:.5,maxForce:9,desiredSpeed:1.7,pathStrength:6,pathRadius:.55,separationWeight:1.6,alignmentWeight:.7,cohesionWeight:.5,flowStrength:2.4,radialDamping:2.6,noiseStrength:.3,progression:1,sortInterval:1,pathSamples:512,pathScale:2.2,boidScale:.08,tubeRadius:.028,showPath:!0,autorotate:!0,boidColorX:"#6f9bf0",boidColorY:"#123a8f",boidColorZ:"#1f5cd9",lighting:"world",dprCap:2,resolutionScale:1,timeScale:1};function ht(i,t){return i[t]}function re(i,t,e){i[t]=e}const dt="boids-infinity-gpu",G=1,oe=["pathSamples","pathScale","tubeRadius"],tt=Object.keys(J).filter(i=>!oe.includes(i)),ne=[4096,8192,16384,32768,65536,131072],se={lighting:["world","local"]},ae={count:[1024,131072],bins:[64,4096],neighborBins:[0,128],perBinCap:[1,64],maxNeighbors:[1,256],neighborRadius:[.02,2],separationRadius:[.005,1],maxSpeed:[.1,10],minSpeed:[0,5],maxForce:[0,100],desiredSpeed:[0,10],pathStrength:[0,50],pathRadius:[.01,3],separationWeight:[0,10],alignmentWeight:[0,10],cohesionWeight:[0,10],flowStrength:[0,20],radialDamping:[0,20],noiseStrength:[0,5],progression:[-5,5],sortInterval:[1,30],boidScale:[.005,1],dprCap:[.5,4],resolutionScale:[.25,2],timeScale:[0,5]};function ce(i,t,e){return i<t?t:i>e?e:i}function ue(i,t){let e=t[0],r=1/0;for(const o of t){const n=Math.abs(o-i);n<r&&(r=n,e=o)}return e}function ft(i){return i&&typeof i=="object"?i:{}}function le(i,t){const e={};for(const r of tt)e[r]=ht(i,r);return{app:dt,version:G,savedAt:new Date().toISOString(),params:e,camera:{...t,target:[t.target[0],t.target[1],t.target[2]]}}}function mt(i){return JSON.stringify(i,null,2)}function he(i){const t=ft(i),e=(o,n)=>typeof o=="number"&&Number.isFinite(o)?o:n;let r=[I.target[0],I.target[1],I.target[2]];return Array.isArray(t.target)&&t.target.length===3&&t.target.every(o=>typeof o=="number"&&Number.isFinite(o))&&(r=[t.target[0],t.target[1],t.target[2]]),{yaw:e(t.yaw,I.yaw),pitch:e(t.pitch,I.pitch),distance:e(t.distance,I.distance),target:r,fov:e(t.fov,I.fov)}}function de(i){const t=ft(i),e={};for(const r of tt){const o=J[r],n=t[r];if(typeof o=="number"){let s=o;if(typeof n=="number"&&Number.isFinite(n)){const[c,a]=ae[r]??[-1e9,1e9];s=ce(n,c,a),r==="count"?s=ue(s,ne):r==="sortInterval"&&(s=Math.round(s))}e[r]=s}else if(typeof o=="string"){const s=se[r];if(s)e[r]=typeof n=="string"&&s.includes(n)?n:o;else{const c=typeof n=="string"?ut(n):null;e[r]=c??o}}else e[r]=typeof n=="boolean"?n:o}return e}function fe(i){let t;try{t=JSON.parse(i)}catch{throw new Error("File is not valid JSON")}if(!t||typeof t!="object"||Array.isArray(t))throw new Error("Config root must be an object");const e=t;if(e.version!==void 0){if(typeof e.version!="number"||!Number.isFinite(e.version))throw new Error("Invalid config version");if(e.version>G)throw new Error(`Config version ${e.version} is newer than supported (${G})`)}const r=typeof e.version=="number"?e.version:G;return{app:typeof e.app=="string"?e.app:dt,version:r,savedAt:typeof e.savedAt=="string"?e.savedAt:new Date().toISOString(),params:de(e.params),camera:he(e.camera)}}function me(i,t){const e=t,r=[];for(const o of tt){const n=e[o];n!==void 0&&ht(i,o)!==n&&(re(i,o,n),r.push(o))}return r}function pe(){const i=new Date,t=e=>String(e).padStart(2,"0");return`${i.getFullYear()}-${t(i.getMonth()+1)}-${t(i.getDate())}_${t(i.getHours())}-${t(i.getMinutes())}-${t(i.getSeconds())}`}function ge(){return`boids-config-${pe()}.json`}function be(i,t=ge()){const e=mt(i),r=new Blob([e],{type:"application/json"}),o=URL.createObjectURL(r),n=document.createElement("a");return n.href=o,n.download=t,document.body.appendChild(n),n.click(),n.remove(),setTimeout(()=>URL.revokeObjectURL(o),1e3),t}async function ve(i){const t=mt(i);try{if(navigator.clipboard&&navigator.clipboard.writeText)return await navigator.clipboard.writeText(t),!0}catch{}return xe(t)}function xe(i){try{const t=document.createElement("textarea");t.value=i,t.style.position="fixed",t.style.top="-1000px",t.style.opacity="0",document.body.appendChild(t),t.focus(),t.select();const e=document.execCommand("copy");return t.remove(),e}catch{return!1}}async function ye(i){const t=await i.text();return fe(t)}class Te{constructor(t,e,r){u(this,"statusEl",null);this.container=t,this.params=e,this.handlers=r,this.refresh()}refresh(){this.container&&(this.container.innerHTML="",ee(this.container,this.params,t=>this.handlers.onParamChange(t)),this.statusEl=ie(this.container,{onSave:()=>this.save(),onLoad:t=>void this.load(t),onReset:()=>this.reset(),onCopy:()=>void this.copy()}))}save(){const t=be(this.handlers.getConfig());V(this.statusEl,`Saved ${t}`)}async load(t){try{const e=await ye(t);this.handlers.applyConfig(e),V(this.statusEl,`Loaded ${t.name}`)}catch(e){const r=e instanceof Error?e.message:String(e);V(this.statusEl,`Load failed: ${r}`,!0)}}async copy(){const t=await ve(this.handlers.getConfig());V(this.statusEl,t?"Copied config JSON":"Copy failed",!t)}reset(){this.handlers.resetToDefaults(),this.refresh(),V(this.statusEl,"Reset to defaults")}}class Ee{constructor(t,e,r={}){u(this,"scene");u(this,"camera");u(this,"hud");u(this,"panel");u(this,"controller");u(this,"loop");u(this,"handleResize",()=>this.scene.resize());this.params=e;const o=r.ui??!0,n=r.interactive??!0;this.scene=new qt(t,e,{antialias:r.antialias,transparent:r.transparent}),this.camera=new Kt(t,n),this.camera.autorotate=e.autorotate;const s=document.getElementById("hud");this.hud=s?new Jt(s):null,this.panel=o?Z.mount():null,this.controller=o?new Te(document.getElementById("controls"),e,{getConfig:()=>this.getConfig(),applyConfig:c=>this.applyConfig(c),resetToDefaults:()=>this.resetToDefaults(),onParamChange:c=>this.scene.reactToChanges([c])}):null,this.loop=new Qt(this.scene,this.camera,e,this.hud),window.addEventListener("resize",this.handleResize)}getConfig(){return le(this.params,this.camera.getState())}applyConfig(t){const e=me(this.params,t.params);this.camera.setState(t.camera),this.camera.autorotate=this.params.autorotate,this.scene.reactToChanges(e),this.controller?.refresh()}resetToDefaults(){Object.assign(this.params,J),this.camera.reset(),this.camera.autorotate=this.params.autorotate,this.scene.rebuild(),this.scene.resize()}start(){this.loop.start()}stop(){this.loop.stop()}dispose(){this.loop.dispose(),window.removeEventListener("resize",this.handleResize),this.panel?.dispose(),this.camera.dispose(),this.scene.dispose()}}function Ae(i){const t=document.getElementById("gl");try{const e=new Ee(t,i.params,{ui:i.ui,interactive:i.interactive,antialias:i.antialias,transparent:i.transparent});return i.configure?.(e),e.start(),window.addEventListener("beforeunload",()=>e.dispose()),window.__boids=e,e}catch(e){if(e instanceof W)ct(e.message,e.hint);else{const r=e instanceof Error?e.message:String(e);ct("Something went wrong",`<code>${lt(r)}</code>`)}throw e}}function ct(i,t){const e=document.getElementById("error"),r=document.getElementById("errorTitle"),o=document.getElementById("errorBody");!e||!r||!o||(r.textContent=i,o.innerHTML=t,e.classList.add("show"))}function we(){if(typeof navigator>"u")return!1;const i=navigator.userAgent||"";if(/Android|iPhone|iPad|iPod|Mobile|Silk|Kindle/i.test(i))return!0;const t=/Macintosh/.test(i),e=typeof navigator.maxTouchPoints=="number"&&navigator.maxTouchPoints>1;return t&&e}const Pe={dprCap:1.5,resolutionScale:.6,sortInterval:4,maxNeighbors:32,perBinCap:16,neighborBins:16,showPath:!1};function Fe(i){Object.assign(i,Pe)}export{J as D,Pe as M,Fe as a,Ae as b,we as d,fe as p};
//# sourceMappingURL=platform-DmYaX5eH.js.map
