import React from "react"
import styled from "styled-components"

const PublicPgpKeyWrapper = styled.div`
  padding-left: 20px;
`

const PgpKeyWrapper = styled.div``

const StyledPre = styled.pre`
  white-space: pre-wrap;
  word-break: break-all; /* Casse les mots pour éviter les débordements */
  max-width: 600px;
`

function PublicPgpKey() {
  return (
    <PublicPgpKeyWrapper>
      <h2>Ma Clé Publique PGP</h2>
      <PgpKeyWrapper>
        <StyledPre>
          -----BEGIN PGP PUBLIC KEY BLOCK-----
          <br />
          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
          hEgUVykmzKLPKNrx9pra =PVkk <br />
          -----END PGP PUBLIC KEY BLOCK-----
        </StyledPre>
      </PgpKeyWrapper>
    </PublicPgpKeyWrapper>
  )
}

export default PublicPgpKey
