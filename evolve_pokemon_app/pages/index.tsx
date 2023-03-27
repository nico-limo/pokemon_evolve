import {
  ConnectWallet,
  ThirdwebNftMedia,
  useAddress,
  useContract,
  useOwnedNFTs,
  Web3Button
} from '@thirdweb-dev/react'
import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'

const EVOLVE_CONTRACT = '0x04eAAA59459ECA7Caa8D73E3A40f25773ed1856a'
const Home: NextPage = () => {
  const { contract } = useContract(EVOLVE_CONTRACT)
  const address = useAddress()
  const { data: nfts } = useOwnedNFTs(contract, address)

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to a Evolve Pokemon Center!</h1>

        <div className={styles.connect}>
          <ConnectWallet accentColor='blue' colorMode='dark' />
        </div>

        {nfts?.length === 0 && (
          <div className={styles.mint}>Claim your First Pokemon </div>
        )}
        <div className={styles.grid}>
          {nfts?.map((nft) => (
            <div key={nft.metadata.id} className={styles.card}>
              <ThirdwebNftMedia metadata={nft.metadata} />
              <div className={styles.grid}>
                <h3>{nft.metadata.name}</h3>
                <h3>Quantity {nft.quantityOwned}</h3>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.grid}>
          <Web3Button
            accentColor='blue'
            contractAddress={EVOLVE_CONTRACT}
            action={() => contract?.erc1155.claim(0, 1)}
          >
            Claim a Charmander
          </Web3Button>
          <Web3Button
            accentColor='red'
            contractAddress={EVOLVE_CONTRACT}
            action={() => contract?.call('evolve')}
          >
            Evolve
          </Web3Button>
        </div>
        <p>
          Powered by <a href='http://thirdweb.com/'>thirdweb</a>
        </p>
      </main>
    </div>
  )
}

export default Home
