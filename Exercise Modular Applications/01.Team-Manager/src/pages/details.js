import { html } from '../../node_modules/lit-html/lit-html.js';
import { until } from '../../node_modules/lit-html/directives/until.js';
import { loading } from '../loading.js';
import { getTeamById, sendRequest, getRequestsTeamId, cancelMembership, approveMembership } from '../api/data.js';

let detailsTemplate = (team, isOwner, createControls, pending, members) => html`
<section id="team-home">
    <article class="layout">
        <img src="${team.logoUrl}" class="team-logo left-col">
        <div class="tm-preview">
            <h2>Team Rocket</h2>
            <p>Gotta catch 'em all!</p>
            <span class="details">${team.membercount} Members</span>
            <div>

                ${createControls()}

            </div>
        </div>
        <div class="pad-large">
            <h3>Members</h3>
            <ul class="tm-members">
            ${members.map(m => memberTemplate(m, isOwner))}
            </ul>
        </div>
        ${isOwner ? html`
        <div class="pad-large">
            <h3>Membership Requests</h3>
            <ul class="tm-members">
                ${pending.map(pendingTamplate)}
            </ul>
        </div>` : ''}

    </article>
</section>`;

let memberTemplate = (request, isOwner) => html`
    <li>${request.user.username}
    ${isOwner
        ? html `<a @click =${request.decline} href="javascript:void(0)" class="tm-control action">Remove from team</a>` 
        : '' }
    </li>
`;

let pendingTamplate = (request) => html`
<li>${request.user.username}
    <a @click=${request.approve} href="javascript:void(0)" class="tm-control action">Approve</a>
    <a @click=${request.decline} href="javascript:void(0)" class="tm-control action">Decline</a>
</li>
`

export async function detailsPage(ctx) {
    let teamId = ctx.params.id;
    ctx.render(until(populate(teamId), loading()));

    async function populate(teamId) {
        let userId = sessionStorage.getItem('userId');
        let [team, requests] = await Promise.all([
            getTeamById(teamId),
            getRequestsTeamId(teamId)
        ])

        requests.forEach(r => {
            r.approve = (e) => approve(e, r);
            r.decline = (e) => leave(e, r._id);
        });

        let isOwner = userId == team._ownerId
        let members = requests.filter(r => r.status == 'member')
        let pending = requests.filter(r => r.status == 'pending')
        team.membercount = members.length;

        return detailsTemplate(team, isOwner, createControls, pending, members);

        function createControls() {

            if (userId != null) {
                let request = requests.find(r => r._ownerId == userId)
                if (isOwner) {

                    return html`<a href="/edit/${team._id}" class="action">Edit team</a>`

                } else if (request && request.status == 'member') {

                    return html`<a @click=${e=> leave(e, request._id)} href="javascript:void(0)" class="action invert">Leave team</a>`

                } else if (request && request.status == 'pending') {

                    return html`Membership pending. <a @click=${e=> leave(e, request._id)} href="javascript:void(0)">Cancel request</a>`

                } else {
                    return html`<a @click=${joinRequest} href="javascript:void(0)" class="action">Join team</a>`
                }
            } else {
                return '';
            }

        }

        async function joinRequest(ev) {
            ev.target.remove();
            await sendRequest(teamId);
            ctx.render(await populate(teamId));

        }

        async function leave(ev, requestId) {
            const confirmed = confirm('Are you sure?');
            if (confirmed) {
                ev.target.remove()
                await cancelMembership(requestId);
                ctx.render(await populate(teamId));
            }

        }

        async function approve(ev, request) {
            ev.target.remove();
            await approveMembership(request);
            ctx.render(await populate(teamId));
        }
    }

}