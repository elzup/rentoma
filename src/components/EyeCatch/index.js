// @flow
import * as React from 'react'

type Props = {}

const EyeCatch = (props: Props) => {
  return (
    <section>
      <p>
        Rentoma は IoT 開発者向けツールです。
        <br />
        LTEデバイスでネットワーク通信がてきているかを確認することが出来ます。
        <br />
        <code>https://rentoma.anozon.me/log</code>
        へHTTPリクエストを送るとサーバーのログをここで見ることが出来ます。
        <br />
        <span style={{ color: 'red' }}>
          ※ body の内容を確認する場合は content-type: text/plain を推奨します。
        </span>
      </p>
      <code>
        <pre>
          {`例:
curl --request POST \\
  --url https://rentoma.anozon.me/log \\
  --header 'content-type: text/plain' \\
  --header 'x-original-header: Hello_Toshino' \\
  --data '{ "broken: "JSON" }'
          `}
        </pre>
      </code>
    </section>
  )
}

export default EyeCatch
