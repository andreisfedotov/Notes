using Serilog;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Notes.Application.Interfaces;

namespace Notes.Application.Common.Behaviors
{
    public class LoggingBehavior<TRequest, TResponse>
        : IPipelineBehavior<TRequest, TResponse> where TRequest
        : IRequest<TResponse>
    {
        ICurrentUserService _currentUserService;

        public LoggingBehavior(ICurrentUserService currentUserService) =>
            _currentUserService = currentUserService;

        public async Task<TResponse> Handle(TRequest request,
            CancellationToken cancellationToken,
            RequestHandlerDelegate<TResponse> next)
        {
            var requestName = typeof(TRequest).Name;
            var userId = _currentUserService.UserId;

            Log.Information("Notes Request: {Name} {@UserId} {@Request}",
                requestName, userId, request);

            var response = await next();

            return response;
        }
    }
}
