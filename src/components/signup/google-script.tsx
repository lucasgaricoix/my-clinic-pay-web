import Script from 'next/script'

export default function GoogleScript() {
  return (
    <>
      <Script src="https://accounts.google.com/gsi/client" />
      <div
        id="g_id_onload"
        data-client_id={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
        data-login_uri={process.env.NEXT_PUBLIC_GOOGLE_CALLBACK_URL}
        data-ux_mode="redirect"
        data-auto_prompt="false"
      />
    </>
  )
}
