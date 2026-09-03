import { useState } from 'react'
import { ComposeForm } from '@/components/ComposeForm'
import { Feed } from '@/components/Feed'
import { Filters } from '@/components/Filters'
import { Header } from '@/components/Header'
import { IdentityList } from '@/components/IdentityList'
import { Modal } from '@/components/Modal'
import { PostDetail } from '@/components/PostDetail'
import { ProfileForm } from '@/components/ProfileForm'
import { ThreadPanel } from '@/components/ThreadPanel'
import { Toast } from '@/components/Toast'
import { useClaims } from '@/hooks/useClaims'
import { useIdentity } from '@/hooks/useIdentity'
import { usePosts } from '@/hooks/usePosts'
import { useProfiles } from '@/hooks/useProfiles'
import { useToast } from '@/hooks/useToast'
import { supabase } from '@/lib/supabase'
import type { Filter } from '@/types'

type ModalState = { kind: 'profile' } | { kind: 'identities' } | { kind: 'post'; postId: string } | { kind: 'thread'; claimId: string } | null

function App() {
  const { identities, current: identity, updateProfile, switchTo, addIdentity } = useIdentity()
  const { posts } = usePosts()
  const claimsByPost = useClaims()
  const { profileFor } = useProfiles()
  const { message, showToast } = useToast()
  const [filter, setFilter] = useState<Filter>('all')
  const [modal, setModal] = useState<ModalState>(null)

  async function handleCreatePost(fields: { location: string; whenText: string; description: string; tags: string[] }) {
    if (!identity) return
    const { error } = await supabase.from('posts').insert({
      author_id: identity.uid,
      author_name: identity.name,
      location: fields.location,
      when_text: fields.whenText,
      description: fields.description,
      tags: fields.tags,
    })
    showToast(error ? 'could not post — try again' : 'posted to the board')
  }

  async function handleSubmitClaim(postId: string, note: string) {
    if (!identity) return
    const { error } = await supabase.from('claims').insert({
      post_id: postId,
      claimant_id: identity.uid,
      claimant_name: identity.name,
      note,
    })
    showToast(error ? 'could not send claim' : 'claim sent')
  }

  if (!identity) return null

  const openPost = modal?.kind === 'post' ? (posts.find((p) => p.id === modal.postId) ?? null) : null
  const openPostClaims = openPost ? (claimsByPost[openPost.id] ?? []) : []

  const openThreadClaim =
    modal?.kind === 'thread'
      ? (Object.values(claimsByPost)
          .flat()
          .find((c) => c.id === modal.claimId) ?? null)
      : null
  const openThreadPost = openThreadClaim ? posts.find((p) => p.id === openThreadClaim.post_id) : undefined
  const otherUid = openThreadClaim
    ? identity.uid === openThreadClaim.claimant_id
      ? openThreadPost?.author_id
      : openThreadClaim.claimant_id
    : undefined
  const otherFallback = openThreadClaim
    ? identity.uid === openThreadClaim.claimant_id
      ? (openThreadPost?.author_name ?? 'them')
      : openThreadClaim.claimant_name
    : undefined

  return (
    <div className="min-h-screen">
      <Header identity={identity} onOpenProfile={() => setModal({ kind: 'profile' })} onOpenIdentities={() => setModal({ kind: 'identities' })} />

      <div className="mx-auto max-w-[920px] px-5 pb-20">
        <ComposeForm onSubmit={handleCreatePost} />
        <Filters value={filter} onChange={setFilter} />
        <Feed
          posts={posts}
          currentUid={identity.uid}
          filter={filter}
          claimsByPost={claimsByPost}
          profileFor={profileFor}
          onOpenPost={(id) => setModal({ kind: 'post', postId: id })}
        />
      </div>

      {modal?.kind === 'profile' && (
        <Modal onClose={() => setModal(null)}>
          <ProfileForm identity={identity} onSave={updateProfile} onClose={() => setModal(null)} onError={showToast} />
        </Modal>
      )}

      {modal?.kind === 'identities' && (
        <Modal onClose={() => setModal(null)}>
          <IdentityList
            identities={identities}
            currentUid={identity.uid}
            onSwitch={(uid) => {
              switchTo(uid)
              const found = identities.find((i) => i.uid === uid)
              if (found) showToast(`now posting as ${found.name}`)
            }}
            onAdd={(name) => {
              const created = addIdentity(name)
              showToast(`now posting as ${created.name}`)
            }}
            onClose={() => setModal(null)}
          />
        </Modal>
      )}

      {modal?.kind === 'post' && openPost && (
        <Modal onClose={() => setModal(null)}>
          <PostDetail
            post={openPost}
            authorProfile={profileFor(openPost.author_id, openPost.author_name)}
            claims={openPostClaims}
            currentUid={identity.uid}
            profileFor={profileFor}
            onSubmitClaim={(note) => void handleSubmitClaim(openPost.id, note)}
            onOpenThread={(claimId) => setModal({ kind: 'thread', claimId })}
            onClose={() => setModal(null)}
          />
        </Modal>
      )}

      {modal?.kind === 'thread' && openThreadClaim && otherUid && (
        <Modal onClose={() => setModal(null)}>
          <ThreadPanel
            claim={openThreadClaim}
            post={openThreadPost}
            currentUid={identity.uid}
            otherProfile={profileFor(otherUid, otherFallback)}
            onClose={() => setModal(null)}
          />
        </Modal>
      )}

      <Toast message={message} />
    </div>
  )
}

export default App
